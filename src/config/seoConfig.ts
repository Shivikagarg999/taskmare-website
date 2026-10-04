/**
 * SEO & Code Injection Configuration for Taskmare Labs
 * 
 * Edit this file to customize meta tags, social sharing cards, 
 * analytics trackers, and custom scripts. 
 * Alternatively, use the interactive SEO Manager in the application.
 */

export type CodeType = 'javascript' | 'html' | 'css';

export interface CustomScript {
  id: string;
  name: string;
  location: 'head' | 'body';
  type?: CodeType;
  code: string;
  enabled: boolean;
  description?: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  robots?: string;
}

export interface SEOConfig {
  default: PageSEO;
  pages: Record<string, Partial<PageSEO>>;
  verification: {
    googleSiteVerification?: string;
    bingSiteVerification?: string;
    yandexVerification?: string;
  };
  analytics: {
    googleAnalyticsId?: string; // e.g. 'G-XXXXXXXXXX'
    googleAnalyticsEnabled: boolean;
    googleTagManagerId?: string; // e.g. 'GTM-XXXXXXX'
    googleTagManagerEnabled: boolean;
    metaPixelId?: string;        // e.g. '1234567890'
    metaPixelEnabled: boolean;
  };
  customScripts: CustomScript[];
  structuredData: {
    organizationName: string;
    organizationUrl: string;
    logoUrl: string;
    telephone: string;
    email: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    socialLinks: string[];
    enableLocalBusinessSchema: boolean;
    enableFaqSchema: boolean;
  };
}

export const DEFAULT_SEO_CONFIG: SEOConfig = {
  default: {
    title: 'Custom Software & Mobile App Development Company in India | Taskmare Labs',
    description: 'Taskmare Labs is a custom software development company and mobile app development agency in India. Delivering native Android & iOS apps, Flutter builds, custom business software, ERP/CRM, and AI solutions.',
    keywords: 'custom software development company, software development company in india, custom software development services, mobile app development company, mobile app development services, android app development company in india, ios and android app development, custom business software development, ai software development company, custom erp software development, custom crm software development, custom healthcare software development, flutter app development, android mobile app development, backend development, cloud computing services, react development',
    canonicalUrl: 'https://taskmare.online/',
    ogTitle: 'Custom Software & Mobile App Development Company in India | Taskmare Labs',
    ogDescription: 'From architecture to Play Store & App Store deployment. We build custom mobile apps, AI software, ERP/CRM, and cloud platforms from scratch for Indian businesses.',
    ogImage: '/assets/taskmare/creative-post.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },
  pages: {
    home: {
      title: 'Custom Software & Mobile App Development Company in India | Taskmare Labs',
      description: 'Custom software development services and mobile app development in India. Native Android, iOS, Flutter, and AI software with 100% code ownership and milestone billing.',
    },
    privacy: {
      title: 'Privacy Policy & Data Security | Taskmare Labs',
      description: 'Learn how Taskmare Labs protects client confidential information, bilateral NDAs, IP rights, and project assets.',
      robots: 'index, follow',
    },
  },
  verification: {
    googleSiteVerification: '', // Enter your Google Search Console token here (e.g. "abc123xyz")
    bingSiteVerification: '',
    yandexVerification: '',
  },
  analytics: {
    googleAnalyticsId: '', // Enter GA4 Measurement ID (e.g. "G-ABC123XYZ")
    googleAnalyticsEnabled: false,
    googleTagManagerId: '', // Enter GTM Container ID (e.g. "GTM-XXXXXXX")
    googleTagManagerEnabled: false,
    metaPixelId: '', // Enter Facebook/Meta Pixel ID
    metaPixelEnabled: false,
  },
  customScripts: [
    {
      id: 'welcome-console',
      name: 'Studio Developer Console Greeting',
      location: 'head',
      enabled: true,
      description: 'Prints a professional studio banner in the browser developer console.',
      code: `console.log("%c⚡ Taskmare Labs Studio Initialized%c\\nCustom Software, AI & Mobile Architecture\\nContact: taskmarelabs@gmail.com", "color:#E11D48;font-size:14px;font-weight:bold;", "color:#888;font-size:11px;");`,
    }
  ],
  structuredData: {
    organizationName: 'Taskmare Labs',
    organizationUrl: 'https://taskmare.online/',
    logoUrl: 'https://taskmare.online/assets/taskmare/favicon.png',
    telephone: '+919760556855',
    email: 'taskmarelabs@gmail.com',
    streetAddress: '540 Gokul Nagar, Teachers Colony, Chandpur',
    addressLocality: 'Bijnor',
    addressRegion: 'Uttar Pradesh',
    postalCode: '246725',
    addressCountry: 'IN',
    socialLinks: [
      'https://www.facebook.com/taksmare/',
      'https://www.instagram.com/taskmare_labs',
      'https://wa.me/919760556855'
    ],
    enableLocalBusinessSchema: true,
    enableFaqSchema: true,
  }
};
