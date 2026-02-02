import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  keywords?: string[];
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  product?: {
    price?: string;
    currency?: string;
  };
}

const BASE_URL = 'https://gaapio.com';
const DEFAULT_IMAGE = '/assets/images/logo-light.png';
const SITE_NAME = 'Gaapio';

export function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  keywords = [],
  noindex = false,
  article,
  product,
}: SEOProps) {
  const fullTitle = title.includes('Gaapio') ? title : `${title} | Gaapio`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  // Ensure description is within optimal length (150-160 chars)
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Default keywords for all pages
  const defaultKeywords = [
    'technical accounting',
    'accounting memos',
    'CPA software',
    'AI accounting',
    'GAAP compliance',
  ];
  
  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={truncatedDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gaapio" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article-specific meta tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
        </>
      )}
      
      {/* Product-specific meta tags */}
      {product && (
        <>
          {product.price && <meta property="product:price:amount" content={product.price} />}
          {product.currency && <meta property="product:price:currency" content={product.currency} />}
        </>
      )}
      
      {/* Additional SEO tags */}
      <meta name="author" content="Gaapio" />
      <meta name="publisher" content="Gaapio" />
      <meta name="theme-color" content="#1d4ed8" />
      
      {/* Geo tags for US-based business */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
    </Helmet>
  );
}
