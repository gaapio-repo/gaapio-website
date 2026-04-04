import { Helmet } from 'react-helmet-async';
import type { CommentLetterDetail, TopicStat } from '@/types/commentLetters';

const BASE_URL = 'https://gaapio.com';

interface StructuredDataProps {
  schemas: Record<string, unknown>[];
}

export function CommentLetterStructuredData({ schemas }: StructuredDataProps) {
  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function buildDatasetSchema(totalLetters: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'SEC Comment Letter Database',
    description: `Searchable database of ${totalLetters} SEC comment letters with AI-generated summaries, classified by ASC topic, industry, and company.`,
    url: `${BASE_URL}/comment-letters`,
    creator: {
      '@type': 'Organization',
      name: 'Gaapio',
      url: BASE_URL,
    },
    license: 'https://www.sec.gov/privacy#dissemination',
    isAccessibleForFree: true,
    keywords: ['SEC comment letters', 'EDGAR', 'ASC topics', 'accounting research'],
  };
}

export function buildWebPageSchema(letter: CommentLetterDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${letter.company_name} SEC Comment Letter — ${new Date(letter.date_filed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    description: letter.ai_summary || `SEC comment letter for ${letter.company_name}`,
    url: `${BASE_URL}/comment-letters/${letter.slug}`,
    datePublished: letter.date_filed,
    dateModified: letter.created_at,
    author: {
      '@type': 'Organization',
      name: 'Gaapio',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'U.S. Securities and Exchange Commission',
    },
    isAccessibleForFree: true,
  };
}

export function buildFAQSchema(topic: string, letterCount: number, commonQuestions: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What does the SEC commonly ask about ${topic}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: commonQuestions,
        },
      },
      {
        '@type': 'Question',
        name: `How many SEC comment letters have addressed ${topic}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `As of ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}, the SEC has issued ${letterCount} comment letters referencing ${topic}.`,
        },
      },
    ],
  };
}

export function buildCollectionPageSchema(topic: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `SEC Comment Letters — ${topic}`,
    description: `Browse SEC comment letters related to ${topic}, with AI-generated summaries.`,
    url: `${BASE_URL}${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Gaapio',
      url: BASE_URL,
    },
  };
}
