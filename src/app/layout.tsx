import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://einvoice-xml-studio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Free E-Invoice XML Viewer, EN 16931 Validator & PEPPOL / XRechnung / Facturae Generator | XMLInvoice.studio",
    template: "%s | XMLInvoice.studio",
  },
  description:
    "100% Free Client-Side E-Invoice XML Reader, EN 16931 Validator & Generator. Open, inspect, and convert PEPPOL BIS Billing 3.0 (UBL 2.1), German XRechnung 3.0, ZUGFeRD CII, and Spanish Facturae 3.2.2 (.xml) into printable PDFs and Excel CSVs.",
  keywords: [
    "XRechnung XML viewer online free",
    "PEPPOL BIS Billing 3.0 UBL 2.1 viewer",
    "Facturae 3.2.2 XML visor PDF",
    "EN 16931 XML validator online",
    "ZUGFeRD Factur-X CII XML reader",
    "XRechnung 3.0 generator Leitweg-ID",
    "convert XML invoice to Excel CSV",
    "electronic invoice XML to PDF converter",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: siteUrl,
    siteName: "XMLInvoice.studio",
    title:
      "XMLInvoice.studio — Free E-Invoice XML Viewer, EN 16931 Validator & Generator",
    description:
      "Read, validate, and generate PEPPOL UBL 2.1, German XRechnung 3.0, and Spanish Facturae 3.2.2 XML e-invoices 100% locally in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XMLInvoice.studio — Free E-Invoice XML Reader & EN 16931 Studio",
    description:
      "Convert UBL 2.1, XRechnung, ZUGFeRD, and Facturae 3.2.2 XML files into printable PDFs and Excel CSVs with zero server uploads.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "XMLInvoice.studio — Global E-Invoice XML Reader, EN 16931 Validator & Generator",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      inLanguage: ["en", "es"],
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description:
          "100% Free browser-based XML e-invoice viewer, EN 16931 compliance validator, Excel CSV line-item extractor, and official PEPPOL / XRechnung / Facturae XML generator.",
      },
      featureList: [
        "Client-side DOMParser XML Reader for OASIS UBL 2.1, PEPPOL BIS Billing 3.0, German XRechnung 3.0, UN/CEFACT CII (ZUGFeRD / Factur-X), and Spanish Facturae 3.2.2",
        "CEN EN 16931-1 Business Rules Validator (BR-01, BR-02, BR-03, BR-06, BR-07, BR-16, and BR-CO-15 mathematical tax coherence)",
        "1-Click Human-Readable Printable Invoice PDF & RFC 4180 Excel CSV Line-Item Export",
        "Official E-Invoice XML Generator for PEPPOL BIS 3.0, XRechnung 3.0 (Leitweg-ID), and Spanish Facturae 3.2.2",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I open and convert an XRechnung, PEPPOL UBL, or Facturae XML invoice to PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Drag and drop your .xml file into XMLInvoice.studio. The client-side DOMParser engine automatically detects OASIS UBL 2.1, UN/CEFACT CII, or Spanish Facturae 3.2.2, validates EN 16931 compliance rules, and renders an official printable invoice that you can save as a PDF or export to Excel CSV.",
          },
        },
        {
          "@type": "Question",
          name: "Are my confidential XML invoices uploaded to any external server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. XMLInvoice.studio executes 100% locally inside your web browser. Your supplier VAT numbers, IBANs, Leitweg-IDs, and invoice line items never leave your computer.",
          },
        },
        {
          "@type": "Question",
          name: "Which European e-invoicing standards are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We support CEN EN 16931 compliant formats including European PEPPOL BIS Billing 3.0 (OASIS UBL 2.1), German XRechnung 3.0 (KoSIT), ZUGFeRD / Factur-X (UN/CEFACT CrossIndustryInvoice CII), and Spanish Facturae 3.2.2 (FACe).",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-[#1B3B2B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
