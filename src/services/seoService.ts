import { DEFAULT_SEO_CONFIG, SEOConfig, PageSEO, CustomScript } from '../config/seoConfig';

const STORAGE_KEY = 'taskmare_seo_config_v1';

/**
 * Retrieve the current active SEO configuration
 */
export function getActiveSEOConfig(): SEOConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with default to guarantee new schema fields exist
      return {
        ...DEFAULT_SEO_CONFIG,
        ...parsed,
        default: { ...DEFAULT_SEO_CONFIG.default, ...(parsed.default || {}) },
        pages: { ...DEFAULT_SEO_CONFIG.pages, ...(parsed.pages || {}) },
        verification: { ...DEFAULT_SEO_CONFIG.verification, ...(parsed.verification || {}) },
        analytics: { ...DEFAULT_SEO_CONFIG.analytics, ...(parsed.analytics || {}) },
        structuredData: { ...DEFAULT_SEO_CONFIG.structuredData, ...(parsed.structuredData || {}) },
        customScripts: Array.isArray(parsed.customScripts) ? parsed.customScripts : DEFAULT_SEO_CONFIG.customScripts,
      };
    }
  } catch (err) {
    console.warn('Failed to parse stored SEO configuration:', err);
  }
  return DEFAULT_SEO_CONFIG;
}

/**
 * Persist SEO configuration to localStorage
 */
export function saveActiveSEOConfig(config: SEOConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save SEO configuration:', err);
  }
}

/**
 * Reset SEO configuration back to project defaults
 */
export function resetSEOConfigToDefaults(): SEOConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear stored SEO configuration:', err);
  }
  return DEFAULT_SEO_CONFIG;
}

/**
 * Helper to update or create a <meta> tag
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link rel="..."> tag
 */
function setLinkTag(rel: string, href: string): void {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Apply SEO metadata to the DOM for the given page route
 */
export function applySEOMetadata(pageId: string = 'home', customConfig?: SEOConfig): void {
  const config = customConfig || getActiveSEOConfig();
  const pageOverrides = config.pages[pageId] || {};
  const seo: PageSEO = { ...config.default, ...pageOverrides };

  // 1. Page Title
  if (seo.title) {
    document.title = seo.title;
  }

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', seo.description);
  setMetaTag('name', 'keywords', seo.keywords);
  if (seo.robots) {
    setMetaTag('name', 'robots', seo.robots);
  }

  // 3. Canonical URL
  const canonical = seo.canonicalUrl || (window.location.origin + window.location.pathname);
  setLinkTag('canonical', canonical);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:site_name', 'Taskmare Labs');
  setMetaTag('property', 'og:type', seo.ogType || 'website');
  setMetaTag('property', 'og:title', seo.ogTitle || seo.title);
  setMetaTag('property', 'og:description', seo.ogDescription || seo.description);
  setMetaTag('property', 'og:url', canonical);
  if (seo.ogImage) {
    const fullOgImage = seo.ogImage.startsWith('http') 
      ? seo.ogImage 
      : `${window.location.origin}${seo.ogImage.startsWith('/') ? '' : '/'}${seo.ogImage}`;
    setMetaTag('property', 'og:image', fullOgImage);
  }

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.ogTitle || seo.title);
  setMetaTag('name', 'twitter:description', seo.ogDescription || seo.description);
  if (seo.ogImage) {
    const fullTwitterImage = seo.ogImage.startsWith('http') 
      ? seo.ogImage 
      : `${window.location.origin}${seo.ogImage.startsWith('/') ? '' : '/'}${seo.ogImage}`;
    setMetaTag('name', 'twitter:image', fullTwitterImage);
  }

  // 6. Search Console Verification Tags
  if (config.verification.googleSiteVerification) {
    setMetaTag('name', 'google-site-verification', config.verification.googleSiteVerification);
  }
  if (config.verification.bingSiteVerification) {
    setMetaTag('name', 'msvalidate.01', config.verification.bingSiteVerification);
  }
  if (config.verification.yandexVerification) {
    setMetaTag('name', 'yandex-verification', config.verification.yandexVerification);
  }

  // 7. Inject/Update Schema.org Structured Data
  injectStructuredData(config);

  // 8. Inject Analytics & Custom Scripts
  injectAnalyticsAndScripts(config);
}

/**
 * Injects Schema.org JSON-LD structured data
 */
function injectStructuredData(config: SEOConfig): void {
  const { structuredData } = config;
  const scriptId = 'taskmare-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schemas: any[] = [];

  // LocalBusiness / ProfessionalService schema
  if (structuredData.enableLocalBusinessSchema) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${structuredData.organizationUrl}#organization`,
      name: structuredData.organizationName,
      url: structuredData.organizationUrl,
      logo: structuredData.logoUrl,
      image: `${structuredData.organizationUrl}assets/taskmare/creative-post.png`,
      description: config.default.description,
      email: structuredData.email,
      telephone: structuredData.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: structuredData.streetAddress,
        addressLocality: structuredData.addressLocality,
        addressRegion: structuredData.addressRegion,
        postalCode: structuredData.postalCode,
        addressCountry: structuredData.addressCountry,
      },
      areaServed: 'Global',
      sameAs: structuredData.socialLinks,
      priceRange: '$$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:30',
        },
      ],
    });
  }

  // SoftwareApplication / WebSite schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Taskmare Labs',
    url: structuredData.organizationUrl,
    description: config.default.description,
    publisher: {
      '@type': 'Organization',
      name: structuredData.organizationName,
      logo: structuredData.logoUrl,
    },
  });

  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
}

/**
 * Injects Analytics Trackers and Custom Scripts
 */
function injectAnalyticsAndScripts(config: SEOConfig): void {
  // 1. Google Analytics (GA4)
  const gaId = config.analytics.googleAnalyticsId?.trim();
  const gaScriptId = 'taskmare-ga4-script';
  const existingGa = document.getElementById(gaScriptId);

  if (config.analytics.googleAnalyticsEnabled && gaId) {
    if (!existingGa) {
      const gaScript = document.createElement('script');
      gaScript.id = gaScriptId;
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement('script');
      gaInit.id = `${gaScriptId}-init`;
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(gaInit);
    }
  } else if (existingGa) {
    existingGa.remove();
    document.getElementById(`${gaScriptId}-init`)?.remove();
  }

  // 2. Google Tag Manager
  const gtmId = config.analytics.googleTagManagerId?.trim();
  const gtmScriptId = 'taskmare-gtm-script';
  const existingGtm = document.getElementById(gtmScriptId);

  if (config.analytics.googleTagManagerEnabled && gtmId) {
    if (!existingGtm) {
      const gtmScript = document.createElement('script');
      gtmScript.id = gtmScriptId;
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
    }
  } else if (existingGtm) {
    existingGtm.remove();
  }

  // 3. Meta / Facebook Pixel
  const pixelId = config.analytics.metaPixelId?.trim();
  const pixelScriptId = 'taskmare-meta-pixel';
  const existingPixel = document.getElementById(pixelScriptId);

  if (config.analytics.metaPixelEnabled && pixelId) {
    if (!existingPixel) {
      const pixelScript = document.createElement('script');
      pixelScript.id = pixelScriptId;
      pixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(pixelScript);
    }
  } else if (existingPixel) {
    existingPixel.remove();
  }

  // 4. User Custom Scripts & Code Injections (JS, CSS, HTML)
  // First, clean up any custom elements that are no longer enabled or in config
  const activeIds = new Set(config.customScripts.filter(s => s.enabled).map(s => s.id));
  document.querySelectorAll('[data-taskmare-custom-id]').forEach(el => {
    const id = el.getAttribute('data-taskmare-custom-id');
    if (!id || !activeIds.has(id)) {
      el.remove();
    }
  });

  config.customScripts.forEach((scriptItem: CustomScript) => {
    const elementId = `custom-code-${scriptItem.id}`;
    const existing = document.getElementById(elementId);

    if (scriptItem.enabled && scriptItem.code.trim()) {
      if (existing) {
        existing.remove(); // Re-inject to allow edits to take effect immediately
      }

      try {
        const rawCode = scriptItem.code.trim();
        const detectedType = scriptItem.type || (
          rawCode.startsWith('<style') || rawCode.includes('{\n') && !rawCode.includes('function') ? 'css' :
          rawCode.startsWith('<div') || rawCode.startsWith('<meta') || rawCode.startsWith('<link') || rawCode.startsWith('<iframe') ? 'html' :
          'javascript'
        );

        if (detectedType === 'css') {
          // CSS injection
          const styleEl = document.createElement('style');
          styleEl.id = elementId;
          styleEl.setAttribute('data-taskmare-custom-id', scriptItem.id);
          // Strip enclosing <style> tags if user provided them
          const cssContent = rawCode.replace(/<\/?style[^>]*>/gi, '');
          styleEl.textContent = cssContent;
          document.head.appendChild(styleEl);
        } else if (detectedType === 'html') {
          // HTML element injection
          const container = document.createElement(scriptItem.location === 'head' ? 'div' : 'div');
          container.id = elementId;
          container.setAttribute('data-taskmare-custom-id', scriptItem.id);
          container.innerHTML = rawCode;
          if (scriptItem.location === 'head') {
            // Append children directly to head
            Array.from(container.children).forEach(child => {
              child.setAttribute('data-taskmare-custom-id', scriptItem.id);
              document.head.appendChild(child);
            });
          } else {
            document.body.appendChild(container);
          }
        } else {
          // JavaScript injection
          // Check if user pasted a full <script src="..."> tag
          const srcMatch = rawCode.match(/<script[^>]+src=["']([^"']+)["'][^>]*>/i);
          if (srcMatch && srcMatch[1]) {
            const extScript = document.createElement('script');
            extScript.id = elementId;
            extScript.setAttribute('data-taskmare-custom-id', scriptItem.id);
            extScript.src = srcMatch[1];
            extScript.async = true;
            document.head.appendChild(extScript);
          } else {
            // Inline JavaScript
            const cleanJs = rawCode.replace(/<\/?script[^>]*>/gi, '');
            const scriptEl = document.createElement('script');
            scriptEl.id = elementId;
            scriptEl.setAttribute('data-taskmare-custom-id', scriptItem.id);
            scriptEl.text = cleanJs;
            if (scriptItem.location === 'head') {
              document.head.appendChild(scriptEl);
            } else {
              document.body.appendChild(scriptEl);
            }
          }
        }
      } catch (err) {
        console.error(`Error injecting code snippet [${scriptItem.name}]:`, err);
      }
    }
  });
}

/**
 * Execute a snippet immediately in test mode and return result/error
 */
export function testExecuteSnippet(code: string, type: 'javascript' | 'html' | 'css'): { success: boolean; message: string } {
  try {
    if (type === 'css') {
      const cleanCss = code.replace(/<\/?style[^>]*>/gi, '');
      const testStyle = document.createElement('style');
      testStyle.textContent = cleanCss;
      document.head.appendChild(testStyle);
      setTimeout(() => testStyle.remove(), 2500);
      return { success: true, message: 'CSS validated and temporarily applied for 2.5s.' };
    } else if (type === 'html') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      const hasErrors = doc.querySelector('parsererror');
      if (hasErrors) {
        return { success: false, message: 'HTML syntax parsing error.' };
      }
      return { success: true, message: 'HTML snippet validated successfully.' };
    } else {
      const cleanJs = code.replace(/<\/?script[^>]*>/gi, '');
      // Test execution in isolated scope
      const testFn = new Function(cleanJs);
      testFn();
      return { success: true, message: 'JavaScript executed successfully without runtime errors.' };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || String(err) };
  }
}

/**
 * Exports current config as pristine TypeScript code ready to paste into `src/config/seoConfig.ts`
 */
export function exportConfigAsCode(config: SEOConfig): string {
  return `export const DEFAULT_SEO_CONFIG: SEOConfig = ${JSON.stringify(config, null, 2)};`;
}
