export interface SeoToolConfig {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  defaultTab: "read" | "generate";
  defaultPreset?: "xrechnung" | "peppol" | "facturae";
  defaultGeneratorStandard?: "PEPPOL_BIS_3" | "XRECHNUNG_3" | "FACTURAE_322";
  highlights: {
    title: string;
    body: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SEO_TOOLS: SeoToolConfig[] = [
  {
    slug: "xrechnung-viewer-online",
    title: "Free XRechnung XML Viewer & PDF Converter Online (Germany E-Rechnung)",
    metaDescription:
      "Open, inspect, and convert German XRechnung 3.0 XML e-invoices (UBL & CII) into human-readable PDFs and Excel CSVs online. 100% client-side EN 16931 & Leitweg-ID check.",
    badge: "DE · E-Rechnung Pflicht 2025–2028",
    h1: "Free XRechnung XML Viewer & PDF Converter Online",
    subtitle:
      "Instantly render machine-readable German XRechnung 3.0 (.xml) files into clean, printable audit invoices. Verify KoSIT EN 16931 business rules and Leitweg-IDs locally in your browser.",
    defaultTab: "read",
    defaultPreset: "xrechnung",
    highlights: [
      {
        title: "Leitweg-ID (BT-10) Extraction",
        body: "Automatically locates and highlights the mandatory German public procurement routing code (cbc:BuyerReference) alongside supplier & buyer VAT IDs.",
      },
      {
        title: "KoSIT XRechnung 3.0 & EN 16931 Validation",
        body: "Audits CustomizationID, line item net extensions, and mathematical tax coherence (BR-CO-15) before submitting to ZRE or OZG-RE portals.",
      },
      {
        title: "Zero-Upload Privacy (100% Browser DOMParser)",
        body: "Sensitive B2B and B2G financial invoices never leave your device. Print directly to A4 PDF or export line items to Excel CSV.",
      },
    ],
    faqs: [
      {
        question: "How do I open an XRechnung XML file as a readable PDF?",
        answer:
          "Drag and drop your XRechnung .xml file into XMLInvoice.studio above. The browser engine parses the UBL 2.1 or UN/CEFACT CII structure immediately and renders a formatted invoice sheet that you can save as a PDF with one click.",
      },
      {
        question: "Is XRechnung mandatory for German B2B companies?",
        answer:
          "Yes. Under Germany's Wachstumschancengesetz, all German businesses must be able to receive EN 16931 compliant e-invoices (such as XRechnung and ZUGFeRD) starting January 1, 2025, with phased mandatory issuance through 2027–2028.",
      },
    ],
  },
  {
    slug: "peppol-ubl-xml-viewer",
    title: "Free PEPPOL BIS 3.0 & UBL 2.1 XML Invoice Viewer & Validator",
    metaDescription:
      "Read, validate, and convert OASIS UBL 2.1 and PEPPOL BIS Billing 3.0 XML invoices into human-readable PDFs and CSV spreadsheets. 100% free & client-side.",
    badge: "EU · OASIS UBL 2.1 & PEPPOL BIS 3.0",
    h1: "Free PEPPOL BIS 3.0 & UBL 2.1 XML Invoice Viewer",
    subtitle:
      "Transform raw OASIS UBL 2.1 XML payloads from PEPPOL Access Points into structured ledger views, audit EN 16931 compliance, and export line items to CSV.",
    defaultTab: "read",
    defaultPreset: "peppol",
    highlights: [
      {
        title: "Full OASIS UBL 2.1 Namespace Support",
        body: "Parses CommonAggregateComponents (cac) and CommonBasicComponents (cbc) including AccountingSupplierParty, TaxSubtotal, and LegalMonetaryTotal.",
      },
      {
        title: "PEPPOL BIS Billing 3.0 Compliance Check",
        body: "Verifies ProfileID, CustomizationID, and mandatory BuyerReference (BT-10) required by European PEPPOL SMP/AS4 networks.",
      },
      {
        title: "1-Click PDF & Accounting CSV Export",
        body: "Download a clean human-readable invoice PDF for archival or extract all UBL InvoiceLines into an Excel-ready CSV file.",
      },
    ],
    faqs: [
      {
        question: "What is a PEPPOL BIS Billing 3.0 XML file?",
        answer:
          "PEPPOL BIS Billing 3.0 is the pan-European Core Invoice Usage Specification (CIUS) of standard EN 16931 based on OASIS UBL 2.1 XML, used across Belgium (B2B mandate 2026), the Netherlands, Scandinavia, and international PEPPOL networks.",
      },
      {
        question: "Can I validate UBL 2.1 tax totals with this viewer?",
        answer:
          "Yes. Our built-in EN 16931 validator checks rule BR-CO-15, ensuring that LineExtensionAmount, TaxExclusiveAmount, TaxAmount, and PayableAmount balance mathematically.",
      },
    ],
  },
  {
    slug: "zugferd-factur-x-xml-reader",
    title: "Free ZUGFeRD & Factur-X CII/UBL XML Reader & Validator",
    metaDescription:
      "Inspect and validate ZUGFeRD 2.2/2.3 and French Factur-X (UN/CEFACT CrossIndustryInvoice CII & UBL) XML files online. Convert to printable PDF and CSV.",
    badge: "DE / FR · UN/CEFACT CII & ZUGFeRD",
    h1: "Free ZUGFeRD & Factur-X XML Reader & Validator",
    subtitle:
      "Parse extracted factur-x.xml or zugferd-invoice.xml payloads (UN/CEFACT CrossIndustryInvoice CII & UBL) with instant EN 16931 business rule verification.",
    defaultTab: "read",
    defaultPreset: "xrechnung",
    highlights: [
      {
        title: "UN/CEFACT CII & UBL Dual-Syntax Engine",
        body: "Reads CrossIndustryInvoice (rsm/ram namespaces) and UBL 2.1 XML files used in German ZUGFeRD 2.3 and French Factur-X Chorus Pro workflows.",
      },
      {
        title: "HeaderMonetarySummation Audit",
        body: "Extracts SpecifiedTradeSettlementHeaderMonetarySummation and line-level BilledQuantity & NetPriceProductTradePrice values accurately.",
      },
      {
        title: "Instant Printable Ledger View",
        body: "Turn standalone XML attachments into a clear, human-readable financial statement ready for PDF printing or ERP CSV import.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between ZUGFeRD, Factur-X, and XRechnung?",
        answer:
          "ZUGFeRD (Germany) and Factur-X (France) use the same EN 16931 semantic data model (typically in UN/CEFACT CII XML format) embedded inside a PDF/A-3 document, whereas XRechnung is a pure XML file (UBL or CII). This reader parses the XML payload of all three.",
      },
      {
        question: "Does this reader upload my Factur-X XML to a server?",
        answer:
          "Never. All XML parsing and EN 16931 validation execute 100% locally inside your web browser using the native DOMParser API.",
      },
    ],
  },
  {
    slug: "facturae-xml-visor-pdf",
    title: "Free Facturae 3.2.2 XML to PDF Viewer & Converter Online",
    metaDescription:
      "Visor Facturae 3.2.2 XML online gratis. Convierte facturas electrónicas Facturae (.xml / .xsig FACe España) a PDF legible y Excel CSV en tu navegador.",
    badge: "ES · Facturae 3.2.2 & FACe / Verifactu",
    h1: "Free Facturae 3.2.2 XML to PDF Viewer & Converter (Visor Facturae)",
    subtitle:
      "Open Spanish Facturae 3.2.2 (.xml) electronic invoices from FACe or B2B suppliers, verify NIF/CIF tax totals and DIR3 codes, and print as a human-readable PDF.",
    defaultTab: "read",
    defaultPreset: "facturae",
    highlights: [
      {
        title: "Native Spanish Facturae 3.2.2 Parser",
        body: "Extracts SellerParty, BuyerParty, AdministrativeCentres (DIR3 codes), TaxesOutputs (IVA), and Installment IBAN details.",
      },
      {
        title: "Convert Facturae XML to Printable PDF",
        body: "Generate a clean, official-style invoice sheet from raw FACe XML files in one click without installing desktop Java utilities.",
      },
      {
        title: "Export Facturae Lines to Excel CSV",
        body: "Download all InvoiceLine items, unit prices, and IVA tax rates into a clean CSV spreadsheet for accounting software.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo ver un archivo XML de Facturae 3.2.2 y pasarlo a PDF?",
        answer:
          "Arrastra tu archivo .xml de Facturae al visor superior. La herramienta interpreta automáticamente los nodos SellerParty, BuyerParty, TaxesOutputs e Items y genera una vista de factura lista para imprimir o guardar como PDF.",
      },
      {
        question: "Is my Spanish Facturae XML data kept private?",
        answer:
          "Yes. All processing happens 100% locally inside your browser. No NIF, IBAN, or invoice amounts are ever transmitted to any external server.",
      },
    ],
  },
  {
    slug: "xrechnung-generator-free",
    title: "Free XRechnung 3.0 XML Generator Online (Leitweg-ID & EN 16931)",
    metaDescription:
      "Create valid German XRechnung 3.0 (UBL 2.1) XML e-invoices online for free. Includes Leitweg-ID (BT-10), IBAN, VAT calculation, and instant .XML download.",
    badge: "DE · KoSIT XRechnung 3.0 Generator",
    h1: "Free XRechnung 3.0 XML Generator Online (Leitweg-ID)",
    subtitle:
      "Generate KoSIT-compliant German XRechnung 3.0 (UBL 2.1) e-invoices with mandatory Leitweg-ID (BT-10), SEPA IBAN payment means, and automatic EN 16931 tax calculation.",
    defaultTab: "generate",
    defaultGeneratorStandard: "XRECHNUNG_3",
    highlights: [
      {
        title: "Official KoSIT XRechnung 3.0 CustomizationID",
        body: "Embeds urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0 and PEPPOL billing profile automatically.",
      },
      {
        title: "Built-In Leitweg-ID & SEPA IBAN Fields",
        body: "Dedicated inputs for German public-sector Leitweg-IDs (cbc:BuyerReference) and PaymentMeansCode 58 SEPA credit transfers.",
      },
      {
        title: "Instant .XML + Printable PDF Dual Export",
        body: "Download both the machine-readable XRechnung .xml file and a matching human-readable PDF copy in one workflow.",
      },
    ],
    faqs: [
      {
        question: "How do I create an XRechnung XML file for free?",
        answer:
          "Fill in your invoice number, issue date, seller/buyer VAT IDs, Leitweg-ID (or buyer reference), IBAN, and line items in the generator above, then click 'Download Official .XML'.",
      },
      {
        question: "Which XRechnung version does this generator produce?",
        answer:
          "It generates XRechnung 3.0 in OASIS UBL 2.1 syntax, fully aligned with European standard EN 16931-1:2017.",
      },
    ],
  },
  {
    slug: "peppol-invoice-generator",
    title: "Free PEPPOL BIS Billing 3.0 UBL XML Invoice Generator",
    metaDescription:
      "Generate EN 16931 compliant PEPPOL BIS Billing 3.0 (OASIS UBL 2.1) XML invoices online for free. Automatic VAT subtotals, line items, and instant XML download.",
    badge: "EU · PEPPOL BIS Billing 3.0 Builder",
    h1: "Free PEPPOL BIS Billing 3.0 UBL XML Invoice Generator",
    subtitle:
      "Author compliant OASIS UBL 2.1 e-invoices for the European PEPPOL network (Belgium, Netherlands, Nordics, EU B2B/B2G) with live XML preview and zero signup.",
    defaultTab: "generate",
    defaultGeneratorStandard: "PEPPOL_BIS_3",
    highlights: [
      {
        title: "Standard PEPPOL BIS 3.0 UBL 2.1 Structure",
        body: "Produces clean, well-formed UBL 2.1 XML with cbc:CustomizationID for PEPPOL BIS Billing 3.0 and ISO 4217 currency attributes.",
      },
      {
        title: "Real-Time Line Extension & VAT Math",
        body: "Calculates LineExtensionAmount, TaxExclusiveAmount, TaxSubtotal, and PayableAmount with strict 2-decimal precision.",
      },
      {
        title: "Live XML Code Inspection",
        body: "Preview the exact UBL 2.1 XML tree as you type and validate it immediately in the EN 16931 reader tab.",
      },
    ],
    faqs: [
      {
        question: "Can I use this generator for Belgium's 2026 B2B PEPPOL mandate?",
        answer:
          "Yes. Belgium's B2B e-invoicing mandate is based on PEPPOL BIS Billing 3.0 (UBL 2.1) compliant with EN 16931, which this generator outputs directly.",
      },
      {
        question: "Is there any limit on the number of XML invoices I can generate?",
        answer:
          "No. XMLInvoice.studio is 100% free and runs entirely in your browser with no watermarks, accounts, or usage limits.",
      },
    ],
  },
  {
    slug: "xml-invoice-to-excel-csv",
    title: "Convert XML E-Invoice (UBL, XRechnung, Facturae) to Excel CSV",
    metaDescription:
      "Extract invoice line items, quantities, unit prices, and VAT rates from UBL 2.1, PEPPOL, XRechnung, ZUGFeRD, and Facturae XML files into Excel CSV online.",
    badge: "ERP & Accounting · XML to CSV Converter",
    h1: "Convert XML E-Invoices (UBL, XRechnung, Facturae) to Excel CSV",
    subtitle:
      "Stop copying XML tags by hand. Parse any European e-invoice XML into a structured line-item table and download a clean .CSV file for Excel, DATEV, or ERP import.",
    defaultTab: "read",
    defaultPreset: "peppol",
    highlights: [
      {
        title: "Multi-Standard Line Item Extraction",
        body: "Normalizes line items from UBL 2.1, XRechnung, ZUGFeRD CII, and Spanish Facturae 3.2.2 into a unified accounting schema.",
      },
      {
        title: "RFC 4180 Compliant CSV Output",
        body: "Includes InvoiceNumber, IssueDate, SellerVAT, BuyerReference, LineID, Description, Quantity, UnitPrice, VATRatePercent, and LineTotalNet.",
      },
      {
        title: "100% Local Spreadsheet Generation",
        body: "Your financial line items are converted to CSV in memory inside your browser for maximum data protection.",
      },
    ],
    faqs: [
      {
        question: "Which columns are included in the exported Excel CSV?",
        answer:
          "Each CSV row contains InvoiceNumber, IssueDate, Standard, SellerName, SellerVAT, BuyerName, BuyerReference, LineID, Description, Quantity, UnitPrice, VATRatePercent, LineTotalNet, and Currency.",
      },
      {
        question: "Does it support multi-line XML invoices?",
        answer:
          "Yes, all InvoiceLine elements in UBL, CII, or Facturae documents are extracted and exported as individual rows.",
      },
    ],
  },
  {
    slug: "en-16931-xml-validator",
    title: "Free EN 16931 E-Invoice XML Schema & Business Rules Validator",
    metaDescription:
      "Validate European e-invoice XML files against CEN EN 16931 business rules (BR-01, BR-02, BR-03, BR-06, BR-07, BR-16, BR-CO-15) online in your browser.",
    badge: "CEN / TC 434 · EN 16931 Compliance Audit",
    h1: "Free EN 16931 E-Invoice XML Business Rules Validator",
    subtitle:
      "Verify core CEN EN 16931-1 semantic business rules and mathematical VAT summation coherence (BR-CO-15) across UBL 2.1, PEPPOL BIS 3.0, XRechnung, and CII XML files.",
    defaultTab: "read",
    defaultPreset: "xrechnung",
    highlights: [
      {
        title: "Core EN 16931 Business Rule Checks",
        body: "Audits BR-01 (Specification ID), BR-02 (Invoice No.), BR-03 (ISO Issue Date), BR-06 (Seller Identity & VAT), BR-07 (Buyer Name), and BR-16 (Line Items).",
      },
      {
        title: "BR-CO-15 Mathematical Integrity Verification",
        body: "Cross-checks that line extension sums match the tax exclusive basis and that tax exclusive + tax amount equals the payable grand total.",
      },
      {
        title: "Instant Visual Audit Report",
        body: "Spot missing mandatory fields or rounding discrepancies in milliseconds before dispatching XML files to tax portals or PEPPOL Access Points.",
      },
    ],
    faqs: [
      {
        question: "What is EN 16931 in European e-invoicing?",
        answer:
          "EN 16931 is the European semantic standard established by CEN under Directive 2014/55/EU defining the core data model and business rules (BR) that all compliant EU electronic invoices must satisfy.",
      },
      {
        question: "Why does rule BR-CO-15 fail on some XML invoices?",
        answer:
          "BR-CO-15 fails when the sum of line net amounts plus total VAT does not equal the payable grand total, often caused by line-level vs. header-level rounding errors in ERP exports.",
      },
    ],
  },
];

export function getSeoToolBySlug(slug: string): SeoToolConfig | undefined {
  return SEO_TOOLS.find((t) => t.slug === slug);
}
