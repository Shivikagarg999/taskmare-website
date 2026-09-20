// lucide-react has no brand icons, so these are drawn inline (Feather-style outlines).
function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/taksmare/', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/taskmare_labs', Icon: InstagramIcon },
];

const variants = {
  light: 'border hairline bg-white text-ink hover:border-brand hover:text-brand',
  footer: 'border border-white/25 text-neutral-300 hover:border-white/60 hover:text-white',
};

function SocialLinks({ variant = 'light' }) {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Taskmare Labs on ${label}`}
          className={`grid size-10 place-items-center rounded-md transition ${variants[variant]}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
