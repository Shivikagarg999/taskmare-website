import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '../../data/site.js';

function upsertTag(selector, tagName, attributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement(tagName);
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([name, value]) => tag.setAttribute(name, value));
}

const setName = (name, content) => upsertTag(`meta[name="${name}"]`, 'meta', { name, content });
const setProperty = (property, content) => upsertTag(`meta[property="${property}"]`, 'meta', { property, content });

// Sets the page title, description, canonical URL and social tags for the current route.
// Crawlers that run JavaScript (Google does) read the values set here.
function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setName('description', description);
    setName('robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });

    setProperty('og:type', 'website');
    setProperty('og:site_name', SITE_NAME);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', url);
    setProperty('og:image', SOCIAL_IMAGE);

    setName('twitter:card', 'summary');
    setName('twitter:title', title);
    setName('twitter:description', description);
    setName('twitter:image', SOCIAL_IMAGE);
  }, [title, description, path, noindex]);

  return null;
}

export default Seo;
