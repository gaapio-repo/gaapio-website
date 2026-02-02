import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://gaapio.com';

// Organization Schema - Used site-wide
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gaapio',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/logo-light.png`,
    description: 'AI-powered technical accounting platform built by CPAs for CPAs. Create accounting memos, footnote disclosures, and compliance documentation faster.',
    foundingDate: '2023',
    industry: 'Accounting Software',
    sameAs: [
      'https://linkedin.com/company/gaapio',
      'https://twitter.com/gaapio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@gaapio.com',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// WebSite Schema - For search functionality
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gaapio',
    url: BASE_URL,
    description: 'AI-powered technical accounting platform for CPAs and accounting teams.',
    publisher: {
      '@type': 'Organization',
      name: 'Gaapio',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Software Application Schema - For the main product
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gaapio',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    description: 'AI-powered technical accounting platform that helps accounting teams create memos, disclosures, and compliance documentation faster.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Contact for pricing',
    },
    creator: {
      '@type': 'Organization',
      name: 'Gaapio',
    },
    featureList: [
      'AI-powered accounting memo generation',
      'Footnote disclosure creation',
      'Contract analysis for ASC 606 and ASC 842',
      'Accounting research assistant',
      'Real-time guidance updates',
      'SOX compliance documentation',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'CPAs, Controllers, CFOs, Accounting Teams',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Product Schema - For individual product pages
interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  features?: string[];
}

export function ProductSchema({ name, description, url, features = [] }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${BASE_URL}${url}`,
    brand: {
      '@type': 'Brand',
      name: 'Gaapio',
    },
    category: 'Accounting Software',
    ...(features.length > 0 && { additionalProperty: features.map(feature => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })) }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// FAQ Schema - For FAQ pages
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Article Schema - For blog posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  publishedDate,
  modifiedDate,
  author = 'Gaapio Team',
  image,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gaapio',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/images/logo-light.png`,
      },
    },
    ...(image && { image: image.startsWith('http') ? image : `${BASE_URL}${image}` }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Service Schema - For solutions pages
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  audience: string;
}

export function ServiceSchema({ name, description, url, audience }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Gaapio',
    },
    audience: {
      '@type': 'Audience',
      audienceType: audience,
    },
    serviceType: 'Accounting Software',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
