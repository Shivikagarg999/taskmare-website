/**
 * Admin Authentication Service
 * Secures access to the SEO, Meta Tags & Script Injection Manager.
 */

const SESSION_KEY = 'taskmare_admin_session_token';
const PASSKEY_KEY = 'taskmare_admin_custom_passkey';
const ATTEMPTS_KEY = 'taskmare_admin_auth_attempts';

// Default initial passkey for the studio owner
const DEFAULT_PASSKEY = 'taskmare@admin2026';

interface AuthAttempts {
  count: number;
  lockedUntil: number | null;
}

/**
 * Get current failed attempts state
 */
function getAttempts(): AuthAttempts {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return { count: 0, lockedUntil: null };
}

/**
 * Record a failed attempt
 */
function recordFailedAttempt(): { locked: boolean; remainingWait: number } {
  const attempts = getAttempts();
  const newCount = attempts.count + 1;
  let lockedUntil = attempts.lockedUntil;

  if (newCount >= 5) {
    // Lock for 5 minutes
    lockedUntil = Date.now() + 5 * 60 * 1000;
  }

  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: newCount, lockedUntil }));

  if (lockedUntil && lockedUntil > Date.now()) {
    return { locked: true, remainingWait: Math.ceil((lockedUntil - Date.now()) / 1000) };
  }
  return { locked: false, remainingWait: 0 };
}

/**
 * Reset failed attempts on success
 */
function resetAttempts(): void {
  sessionStorage.removeItem(ATTEMPTS_KEY);
}

/**
 * Check if admin is currently authenticated in this session
 */
export function isAdminAuthenticated(): boolean {
  try {
    const token = sessionStorage.getItem(SESSION_KEY);
    if (!token) return false;
    const data = JSON.parse(token);
    // Token valid for 24 hours
    if (data.timestamp && Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
      return true;
    }
    logoutAdmin();
  } catch {}
  return false;
}

/**
 * Retrieve the current configured admin passkey
 */
export function getActiveAdminPasskey(): string {
  try {
    const custom = localStorage.getItem(PASSKEY_KEY);
    if (custom) return custom;
  } catch {}
  return DEFAULT_PASSKEY;
}

/**
 * Authenticate with the passkey
 */
export function loginAdmin(enteredPasskey: string): { success: boolean; message: string } {
  const attempts = getAttempts();

  if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
    const seconds = Math.ceil((attempts.lockedUntil - Date.now()) / 1000);
    return {
      success: false,
      message: `Too many failed attempts. Security cooldown active for ${seconds}s.`
    };
  }

  const validPasskey = getActiveAdminPasskey();

  if (enteredPasskey.trim() === validPasskey.trim()) {
    resetAttempts();
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
        user: 'main_admin'
      })
    );
    return { success: true, message: 'Authentication successful.' };
  }

  const { locked, remainingWait } = recordFailedAttempt();
  if (locked) {
    return {
      success: false,
      message: `Incorrect passkey. Too many failed attempts. Locked for ${remainingWait}s.`
    };
  }

  return {
    success: false,
    message: 'Invalid admin passkey. Please verify and try again.'
  };
}

/**
 * Sign out admin and revoke access
 */
export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Update the admin passkey
 */
export function updateAdminPasskey(
  currentPasskey: string,
  newPasskey: string
): { success: boolean; message: string } {
  const active = getActiveAdminPasskey();
  if (currentPasskey !== active) {
    return { success: false, message: 'Current passkey is incorrect.' };
  }
  if (!newPasskey || newPasskey.trim().length < 6) {
    return { success: false, message: 'New passkey must be at least 6 characters.' };
  }

  try {
    localStorage.setItem(PASSKEY_KEY, newPasskey.trim());
    return { success: true, message: 'Admin passkey successfully updated.' };
  } catch (err) {
    return { success: false, message: 'Failed to update passkey.' };
  }
}
