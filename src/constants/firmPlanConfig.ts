// Stripe product configuration for CPA Firm plans
export const FIRM_STRIPE_PRODUCTS = {
  smallFirm: {
    id: "smallFirm",
    name: "Small Firm",
    price: 1500,
    priceId: "price_1SxXUKErMdi9YyI1hz4kNVNp",
    productId: "prod_TvOGNzrXBhYqUD",
    description: "For firms with pre-audit stage clients",
    features: [
      "Internal GPT for your firm",
      "Contract Analysis",
      "Lease Accounting Export"
    ],
    popular: false
  },
  technicalAccounting: {
    id: "technicalAccounting",
    name: "Technical Accounting",
    price: 3000,
    priceId: "price_1SxXW8ErMdi9YyI17r8TSIA8",
    productId: "prod_TvOIdC5x1VGG8R",
    description: "For firms doing technical accounting work",
    features: [
      "Technical Accounting Memos",
      "Accounting Research tools",
      "Analysis & Memo writer",
      "All Small Firm features included"
    ],
    popular: false
  },
  fullFirm: {
    id: "fullFirm",
    name: "Full Firm",
    price: 3600,
    priceId: "price_1SxXYzErMdi9YyI1aE9R9wyQ",
    productId: "prod_TvOLPib96fbCV7",
    description: "For firms serving public companies",
    features: [
      "SOX Compliance module",
      "Footnote Disclosure generation",
      "Audit suite (memo auditor, lease auditor)",
      "All lower-tier features included"
    ],
    popular: true
  },
  contact: {
    id: "contact",
    name: "Custom",
    price: null,
    priceId: null,
    productId: null,
    description: "Custom pricing for larger firms",
    features: [
      "Custom user limits",
      "Volume discounts",
      "Dedicated support",
      "Custom integrations"
    ],
    popular: false
  }
};

export type FirmProductId = keyof typeof FIRM_STRIPE_PRODUCTS;
