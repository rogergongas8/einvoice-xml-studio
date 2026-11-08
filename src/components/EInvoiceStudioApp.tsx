"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Printer,
  FileSpreadsheet,
  Download,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building2,
  Landmark,
  FileText,
  Sparkles,
  ArrowRight,
  Globe,
  Code2,
} from "lucide-react";
import { InvoiceBrandLogo } from "./InvoiceBrandLogo";
import {
  SAMPLE_PRESETS,
  parseEInvoiceXml,
  exportInvoiceLinesToCsv,
  generateOfficialEInvoiceXml,
  type ParsedEInvoice,
  type GeneratorStandard,
  type InvoiceLineItem,
} from "@/lib/einvoice-engine";
import { SEO_TOOLS } from "@/data/seo-tools";

interface EInvoiceStudioAppProps {
  initialTab?: "read" | "generate";
  initialPreset?: "xrechnung" | "peppol" | "facturae";
  initialGeneratorStandard?: GeneratorStandard;
  customHero?: {
    badge: string;
    h1: string;
    subtitle: string;
  };
}

const DICT = {
  en: {
    brandSubtitle: "Global E-Invoice XML Ledger & EN 16931 Studio",
    privacyBadge: "100% Client-Side DOMParser · Zero Server Uploads",
    heroBadge: "EU ViDA · EN 16931 · XRechnung 3.0 · PEPPOL BIS 3.0 · Facturae 3.2.2",
    heroTitle: "Read, Validate & Generate Official E-Invoice XML Files.",
    heroSubtitle:
      "Turn unreadable UBL 2.1, German XRechnung, ZUGFeRD CII, and Spanish Facturae 3.2.2 XML files into clean printable invoices, Excel CSVs, and EN 16931 compliance audits — 100% locally in your browser.",
    tabRead: "Read & Validate XML Invoice",
    tabReadSub: "XML → Human Invoice + CSV + EN 16931 Check",
    tabGenerate: "Generate Official E-Invoice XML",
    tabGenerateSub: "Form → PEPPOL UBL 2.1 / XRechnung / Facturae .XML",
    dropzoneTitle: "Drop an E-Invoice .XML file here, or click to browse",
    dropzoneSub:
      "Supports OASIS UBL 2.1, PEPPOL BIS 3.0, XRechnung 3.0, ZUGFeRD / Factur-X CII & Spanish Facturae 3.2.2 (.xml)",
    presetsLabel: "Or load an official sample preset with 1 click:",
    validBadge: "EN 16931 COMPLIANT",
    invalidBadge: "REVIEW EN 16931 RULES",
    printPdfBtn: "Print / Save as Human-Readable PDF",
    downloadCsvBtn: "Download Line Items (.CSV for Excel)",
    standardDetected: "Detected Standard",
    invoiceNo: "Invoice Number",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    buyerRef: "Buyer Reference / Leitweg-ID",
    currency: "Currency",
    sellerCard: "Seller / Issuing Party (BG-4)",
    buyerCard: "Buyer / Recipient Party (BG-7)",
    vatIdLabel: "VAT / Tax ID",
    countryLabel: "Country",
    addressLabel: "Registered Address",
    paymentIban: "Settlement IBAN (BG-17)",
    lineItemsTitle: "Invoice Line Items (BG-25)",
    colPos: "#",
    colDesc: "Description / Service Item",
    colQty: "Qty",
    colUnit: "Unit Price",
    colVat: "VAT %",
    colNet: "Net Amount",
    taxSubtotalLabel: "Tax Exclusive Subtotal (BT-109)",
    taxAmountLabel: "Total VAT / Output Tax (BT-110)",
    grandTotalLabel: "Payable Grand Total (BT-112)",
    en16931DrawerTitle: "EN 16931 Semantic & Mathematical Business Rules Audit",
    rawXmlDrawerTitle: "Inspect Raw Source XML Payload",
    genTitle: "Official E-Invoice XML Builder",
    genSub: "Fill in the core ledger fields to generate a schema-ready XML e-invoice.",
    outputStandardLabel: "Target E-Invoice Standard",
    addLineBtn: "Add Line Item",
    downloadXmlBtn: "Download Official .XML",
    loadInReaderBtn: "Open & Validate in Reader + Print PDF",
    liveXmlPreviewTitle: "Live Generated XML Code Preview",
    copyXmlBtn: "Copy XML",
    copiedBtn: "Copied!",
    toolsDirectoryTitle: "Specialized E-Invoice XML Tools & Regional Standards",
    toolsDirectorySub:
      "Direct utilities for European B2G & B2B electronic invoicing mandates (Germany E-Rechnung, Belgium PEPPOL 2026, Spain FACe / Verifactu).",
  },
  es: {
    brandSubtitle: "Estudio Global de Factura Electrónica XML y EN 16931",
    privacyBadge: "100% Local en tu Navegador · Cero Subidas al Servidor",
    heroBadge: "UE ViDA · EN 16931 · XRechnung 3.0 · PEPPOL BIS 3.0 · Facturae 3.2.2",
    heroTitle: "Lee, Valida y Genera Facturas Electrónicas XML Oficiales.",
    heroSubtitle:
      "Convierte archivos XML de Facturae 3.2.2 (FACe España), PEPPOL BIS 3.0 (UBL 2.1), XRechnung alemán y ZUGFeRD en facturas legibles en PDF, tablas Excel CSV y auditorías EN 16931 sin salir de tu navegador.",
    tabRead: "Leer y Validar Factura XML",
    tabReadSub: "XML → Factura Legible PDF + CSV + Auditoría EN 16931",
    tabGenerate: "Generar Factura Electrónica XML",
    tabGenerateSub: "Formulario → Facturae 3.2.2 / PEPPOL UBL / XRechnung .XML",
    dropzoneTitle: "Arrastra tu archivo .XML aquí o haz clic para seleccionarlo",
    dropzoneSub:
      "Compatible con Facturae 3.2.2 (España), PEPPOL BIS 3.0 (UBL 2.1), XRechnung 3.0 y ZUGFeRD / Factur-X CII (.xml)",
    presetsLabel: "O carga una factura oficial de ejemplo en 1 clic:",
    validBadge: "CUMPLE NORMA EN 16931",
    invalidBadge: "REVISAR REGLAS EN 16931",
    printPdfBtn: "Imprimir / Guardar Factura en PDF",
    downloadCsvBtn: "Descargar Líneas (.CSV para Excel)",
    standardDetected: "Estándar Detectado",
    invoiceNo: "Número de Factura",
    issueDate: "Fecha de Expedición",
    dueDate: "Fecha de Vencimiento",
    buyerRef: "Referencia Comprador / DIR3 / Leitweg-ID",
    currency: "Divisa",
    sellerCard: "Emisor / Proveedor (BG-4)",
    buyerCard: "Receptor / Cliente (BG-7)",
    vatIdLabel: "NIF / CIF / IVA",
    countryLabel: "País",
    addressLabel: "Domicilio Fiscal",
    paymentIban: "IBAN de Pago (BG-17)",
    lineItemsTitle: "Conceptos y Líneas de Factura (BG-25)",
    colPos: "#",
    colDesc: "Descripción del Concepto / Servicio",
    colQty: "Cant.",
    colUnit: "Precio Unit.",
    colVat: "IVA %",
    colNet: "Importe Neto",
    taxSubtotalLabel: "Base Imponible / Subtotal Neto (BT-109)",
    taxAmountLabel: "Total Impuestos / IVA (BT-110)",
    grandTotalLabel: "Total Factura a Pagar (BT-112)",
    en16931DrawerTitle: "Auditoría de Reglas de Negocio Semánticas EN 16931",
    rawXmlDrawerTitle: "Inspeccionar Código Fuente XML Original",
    genTitle: "Generador Oficial de Factura Electrónica XML",
    genSub: "Completa los datos fiscales para generar un archivo XML válido listo para enviar.",
    outputStandardLabel: "Estándar XML de Salida",
    addLineBtn: "Añadir Línea de Concepto",
    downloadXmlBtn: "Descargar Archivo .XML Oficial",
    loadInReaderBtn: "Abrir en el Visor + Imprimir PDF",
    liveXmlPreviewTitle: "Vista Previa del Código XML en Tiempo Real",
    copyXmlBtn: "Copiar XML",
    copiedBtn: "¡Copiado!",
    toolsDirectoryTitle: "Herramientas Especializadas de Facturación Electrónica XML",
    toolsDirectorySub:
      "Utilidades directas para normativas europeas B2G y B2B (Facturae FACe España, PEPPOL 2026, XRechnung Alemania).",
  },
};

export function EInvoiceStudioApp({
  initialTab = "read",
  initialPreset = "xrechnung",
  initialGeneratorStandard = "PEPPOL_BIS_3",
  customHero,
}: EInvoiceStudioAppProps) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = DICT[lang];

  const [activeTab, setActiveTab] = useState<"read" | "generate">(initialTab);
  const [selectedPreset, setSelectedPreset] = useState<"xrechnung" | "peppol" | "facturae" | "custom">(
    initialPreset
  );
  const [uploadedFilename, setUploadedFilename] = useState<string>(
    SAMPLE_PRESETS[initialPreset].filename
  );
  const [parsedInvoice, setParsedInvoice] = useState<ParsedEInvoice | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [showRulesDrawer, setShowRulesDrawer] = useState<boolean>(true);
  const [showRawXmlDrawer, setShowRawXmlDrawer] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generator State
  const [genStandard, setGenStandard] = useState<GeneratorStandard>(initialGeneratorStandard);
  const [genInvoiceNumber, setGenInvoiceNumber] = useState<string>("INV-2026-0940");
  const [genIssueDate, setGenIssueDate] = useState<string>("2026-03-25");
  const [genDueDate, setGenDueDate] = useState<string>("2026-04-24");
  const [genCurrency, setGenCurrency] = useState<"EUR" | "USD" | "GBP">("EUR");
  const [genBuyerRef, setGenBuyerRef] = useState<string>("991-40219-88");
  const [genSellerName, setGenSellerName] = useState<string>("Alpine Precision Systems GmbH");
  const [genSellerVat, setGenSellerVat] = useState<string>("DE301948271");
  const [genSellerCountry, setGenSellerCountry] = useState<string>("DE");
  const [genSellerAddress, setGenSellerAddress] = useState<string>("Maximilianstraße 35, 80539 München");
  const [genBuyerName, setGenBuyerName] = useState<string>("EuroRail Logistics Infrastructure AG");
  const [genBuyerVat, setGenBuyerVat] = useState<string>("DE812940192");
  const [genBuyerCountry, setGenBuyerCountry] = useState<string>("DE");
  const [genBuyerAddress, setGenBuyerAddress] = useState<string>("Potsdamer Platz 10, 10785 Berlin");
  const [genIban, setGenIban] = useState<string>("DE89370400440532013000");
  const [genLines, setGenLines] = useState<InvoiceLineItem[]>([
    {
      id: "1",
      description: "EN 16931 Core Telemetry & Automated Clearing License",
      quantity: 2,
      unitPrice: 1250,
      vatRate: 19,
      lineTotal: 2500,
    },
    {
      id: "2",
      description: "Technical Onboarding & AS4 Endpoint Provisioning (Hours)",
      quantity: 12,
      unitPrice: 110,
      vatRate: 19,
      lineTotal: 1320,
    },
  ]);
  const [showGenXmlPreview, setShowGenXmlPreview] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Parse initial preset on mount
  useEffect(() => {
    try {
      const preset = SAMPLE_PRESETS[initialPreset];
      const res = parseEInvoiceXml(preset.xml);
      setParsedInvoice(res);
      setUploadedFilename(preset.filename);
      setParseError(null);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Failed to parse XML");
    }
  }, [initialPreset]);

  const handleLoadPreset = (key: "xrechnung" | "peppol" | "facturae") => {
    setSelectedPreset(key);
    const preset = SAMPLE_PRESETS[key];
    setUploadedFilename(preset.filename);
    try {
      const res = parseEInvoiceXml(preset.xml);
      setParsedInvoice(res);
      setParseError(null);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Failed to parse preset XML");
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target?.result || "");
      setSelectedPreset("custom");
      setUploadedFilename(file.name);
      try {
        const res = parseEInvoiceXml(content);
        setParsedInvoice(res);
        setParseError(null);
      } catch (err) {
        setParseError(
          err instanceof Error
            ? err.message
            : "Unable to parse XML file. Ensure it is a valid UBL, CII, or Facturae XML document."
        );
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadCsv = () => {
    if (!parsedInvoice) return;
    const csvContent = exportInvoiceLinesToCsv(parsedInvoice);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${parsedInvoice.invoiceNumber || "einvoice"}-lines.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const generatedResult = generateOfficialEInvoiceXml({
    standard: genStandard,
    invoiceNumber: genInvoiceNumber,
    issueDate: genIssueDate,
    dueDate: genDueDate,
    currency: genCurrency,
    buyerReference: genBuyerRef,
    sellerName: genSellerName,
    sellerVatId: genSellerVat,
    sellerCountry: genSellerCountry,
    sellerAddress: genSellerAddress,
    buyerName: genBuyerName,
    buyerVatId: genBuyerVat,
    buyerCountry: genBuyerCountry,
    buyerAddress: genBuyerAddress,
    iban: genIban,
    lineItems: genLines,
  });

  const handleDownloadGeneratedXml = () => {
    const blob = new Blob([generatedResult.xml], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generatedResult.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenGeneratedInReader = () => {
    try {
      const parsed = parseEInvoiceXml(generatedResult.xml);
      setParsedInvoice(parsed);
      setUploadedFilename(generatedResult.filename);
      setSelectedPreset("custom");
      setParseError(null);
      setActiveTab("read");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Failed to parse generated XML");
    }
  };

  const updateLineItem = (idx: number, field: keyof InvoiceLineItem, value: string | number) => {
    setGenLines((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        const updated = { ...item, [field]: value };
        updated.lineTotal = Number((Number(updated.quantity) * Number(updated.unitPrice)).toFixed(2));
        return updated;
      })
    );
  };

  const addLineItem = () => {
    setGenLines((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        description: "Additional Consulting / Technical Deliverable",
        quantity: 1,
        unitPrice: 250,
        vatRate: genStandard === "FACTURAE_322" ? 21 : 19,
        lineTotal: 250,
      },
    ]);
  };

  const removeLineItem = (idx: number) => {
    if (genLines.length <= 1) return;
    setGenLines((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen flex flex-col bg-ledger text-ink">
      {/* Top Header Bar (Hidden when printing PDF) */}
      <header className="print:hidden sticky top-0 z-30 border-b border-stoneborder bg-ivory/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <InvoiceBrandLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-pine">
                  XMLInvoice<span className="text-copper">.studio</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-pine/10 text-pine border border-pine/20">
                  EN 16931
                </span>
              </div>
              <p className="text-xs text-muted hidden md:block">{t.brandSubtitle}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-ledger border border-stoneborder text-xs text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-pine" />
              <span>{t.privacyBadge}</span>
            </div>

            {/* Language Switcher EN | ES */}
            <div
              className="inline-flex items-center rounded-xl bg-ledger p-1 border border-stoneborder"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-pine text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  lang === "es"
                    ? "bg-pine text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Editorial Hero Header (Hidden in Print) */}
        <section className="print:hidden text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-stoneborder text-xs font-mono font-medium text-copper mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{customHero ? customHero.badge : t.heroBadge}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-ink leading-[1.15] mb-3">
            {customHero ? customHero.h1 : t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {customHero ? customHero.subtitle : t.heroSubtitle}
          </p>
        </section>

        {/* Primary 2-Tab Mode Switcher (Hidden in Print) */}
        <div className="print:hidden max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-ivory border border-stoneborder shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("read")}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                activeTab === "read"
                  ? "bg-pine text-white shadow-sm"
                  : "hover:bg-ledger/70 text-ink"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTab === "read" ? "bg-white/15 text-white" : "bg-pine/10 text-pine"
                }`}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-sm truncate">{t.tabRead}</div>
                <div
                  className={`text-[11px] truncate ${
                    activeTab === "read" ? "text-white/80" : "text-muted"
                  }`}
                >
                  {t.tabReadSub}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("generate")}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                activeTab === "generate"
                  ? "bg-pine text-white shadow-sm"
                  : "hover:bg-ledger/70 text-ink"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTab === "generate"
                    ? "bg-white/15 text-white"
                    : "bg-copper/10 text-copper"
                }`}
              >
                <FileCode2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-sm truncate">{t.tabGenerate}</div>
                <div
                  className={`text-[11px] truncate ${
                    activeTab === "generate" ? "text-white/80" : "text-muted"
                  }`}
                >
                  {t.tabGenerateSub}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: READ & VALIDATE E-INVOICE XML                      */}
        {/* ========================================================= */}
        {activeTab === "read" && (
          <div className="space-y-6">
            {/* Upload & Sample Presets Card (Hidden in Print) */}
            <div className="print:hidden rounded-2xl bg-ivory border border-stoneborder p-5 sm:p-6 shadow-ledger">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-stoneborder hover:border-pine bg-white/80 hover:bg-white p-6 text-center transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xml,text/xml,application/xml"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <div className="w-11 h-11 rounded-xl bg-pine/10 text-pine flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="font-display font-semibold text-base text-ink mb-1">
                  {t.dropzoneTitle}
                </p>
                <p className="text-xs text-muted max-w-xl mx-auto">{t.dropzoneSub}</p>
              </div>

              {/* 1-Click Sample Presets */}
              <div className="mt-4 pt-4 border-t border-stoneborder/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-medium text-muted">{t.presetsLabel}</span>
                <div className="flex flex-wrap items-center gap-2">
                  {(["xrechnung", "peppol", "facturae"] as const).map((key) => {
                    const preset = SAMPLE_PRESETS[key];
                    const active = selectedPreset === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleLoadPreset(key)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          active
                            ? "bg-pine text-white border-pine shadow-sm"
                            : "bg-white text-ink border-stoneborder hover:border-pine/50"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                            active ? "bg-white/20 text-white" : "bg-ledger text-copper"
                          }`}
                        >
                          {preset.badge}
                        </span>
                        <span>{lang === "en" ? preset.labelEn : preset.labelEs}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {parseError && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Parsed Human-Readable Ledger Sheet */}
            {parsedInvoice && (
              <div className="rounded-2xl bg-white border border-stoneborder shadow-ledger overflow-hidden print:shadow-none print:border-none">
                {/* Action & Compliance Header Bar */}
                <div className="bg-ivory border-b border-stoneborder px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {parsedInvoice.isValid ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-900/10 text-emerald-900 border border-emerald-800/20">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        {t.validBadge} ({parsedInvoice.validationRules.filter((r) => r.passed).length}/
                        {parsedInvoice.validationRules.length})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-900/10 text-amber-900 border border-amber-800/20">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        {t.invalidBadge}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-ledger text-ink border border-stoneborder">
                      <FileCode2 className="w-3.5 h-3.5 text-copper" />
                      {parsedInvoice.standardType}
                    </span>

                    <span className="text-xs font-mono text-muted hidden sm:inline">
                      {uploadedFilename}
                    </span>
                  </div>

                  {/* 1-Click Exports */}
                  <div className="print:hidden flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handlePrintPdf}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-pine hover:bg-pine-hover text-white transition-colors shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{t.printPdfBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-copper hover:bg-copper-hover text-white transition-colors shadow-sm"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{t.downloadCsvBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Invoice Sheet Body */}
                <div className="p-6 sm:p-8 space-y-7">
                  {/* Top Metadata Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pb-6 border-b border-stoneborder">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.invoiceNo}
                      </div>
                      <div className="font-mono font-bold text-base sm:text-lg text-ink">
                        {parsedInvoice.invoiceNumber || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.issueDate}
                      </div>
                      <div className="font-mono font-semibold text-sm text-ink">
                        {parsedInvoice.issueDate || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.dueDate}
                      </div>
                      <div className="font-mono font-semibold text-sm text-ink">
                        {parsedInvoice.dueDate || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.buyerRef}
                      </div>
                      <div className="font-mono font-semibold text-sm text-copper break-all">
                        {parsedInvoice.buyerReference || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.currency}
                      </div>
                      <div className="font-mono font-bold text-sm text-pine">
                        {parsedInvoice.currency}
                      </div>
                    </div>
                  </div>

                  {/* Seller & Buyer Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Seller */}
                    <div className="rounded-xl bg-ivory border border-stoneborder p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-pine">
                          <Building2 className="w-4 h-4" />
                          {t.sellerCard}
                        </span>
                        {parsedInvoice.seller.country && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-pine/10 text-pine">
                            {parsedInvoice.seller.country}
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-base text-ink mb-2">
                        {parsedInvoice.seller.name || "—"}
                      </div>
                      <div className="space-y-1 text-xs text-muted">
                        <div>
                          <span className="font-medium text-ink">{t.vatIdLabel}: </span>
                          <span className="font-mono text-ink">
                            {parsedInvoice.seller.vatId || "—"}
                          </span>
                        </div>
                        {parsedInvoice.seller.address && (
                          <div>
                            <span className="font-medium text-ink">{t.addressLabel}: </span>
                            <span>{parsedInvoice.seller.address}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buyer */}
                    <div className="rounded-xl bg-ivory border border-stoneborder p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-copper">
                          <Landmark className="w-4 h-4" />
                          {t.buyerCard}
                        </span>
                        {parsedInvoice.buyer.country && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-copper/10 text-copper">
                            {parsedInvoice.buyer.country}
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-base text-ink mb-2">
                        {parsedInvoice.buyer.name || "—"}
                      </div>
                      <div className="space-y-1 text-xs text-muted">
                        <div>
                          <span className="font-medium text-ink">{t.vatIdLabel}: </span>
                          <span className="font-mono text-ink">
                            {parsedInvoice.buyer.vatId || "—"}
                          </span>
                        </div>
                        {parsedInvoice.buyer.address && (
                          <div>
                            <span className="font-medium text-ink">{t.addressLabel}: </span>
                            <span>{parsedInvoice.buyer.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div>
                    <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted mb-3">
                      {t.lineItemsTitle}
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-stoneborder">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-ledger border-b border-stoneborder text-[11px] font-mono uppercase text-muted">
                            <th className="py-3 px-4 w-12">{t.colPos}</th>
                            <th className="py-3 px-4">{t.colDesc}</th>
                            <th className="py-3 px-4 text-right">{t.colQty}</th>
                            <th className="py-3 px-4 text-right">{t.colUnit}</th>
                            <th className="py-3 px-4 text-right">{t.colVat}</th>
                            <th className="py-3 px-4 text-right">{t.colNet}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stoneborder text-sm">
                          {parsedInvoice.lineItems.map((line, i) => (
                            <tr key={`${line.id}-${i}`} className="hover:bg-ivory/60">
                              <td className="py-3.5 px-4 font-mono text-xs text-muted">
                                {line.id}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-ink">
                                {line.description}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-right text-ink">
                                {line.quantity}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-right text-ink">
                                {line.unitPrice.toFixed(2)} {parsedInvoice.currency}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-right text-muted">
                                {line.vatRate.toFixed(1)}%
                              </td>
                              <td className="py-3.5 px-4 font-mono font-semibold text-right text-ink">
                                {line.lineTotal.toFixed(2)} {parsedInvoice.currency}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Settlement IBAN & Monetary Totals Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 items-start">
                    <div className="md:col-span-6 rounded-xl bg-ledger/60 border border-stoneborder p-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                        {t.paymentIban}
                      </div>
                      <div className="font-mono font-bold text-sm text-ink tracking-wide">
                        {parsedInvoice.iban || "—"}
                      </div>
                      <div className="text-[11px] font-mono text-muted mt-2 break-all">
                        Spec ID: {parsedInvoice.specificationId}
                      </div>
                    </div>

                    <div className="md:col-span-6 rounded-xl bg-ivory border border-stoneborder p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">{t.taxSubtotalLabel}</span>
                        <span className="font-mono font-semibold text-ink">
                          {parsedInvoice.taxSubtotal.toFixed(2)} {parsedInvoice.currency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">{t.taxAmountLabel}</span>
                        <span className="font-mono font-semibold text-ink">
                          {parsedInvoice.taxAmount.toFixed(2)} {parsedInvoice.currency}
                        </span>
                      </div>
                      <div className="pt-2.5 border-t border-stoneborder flex items-center justify-between">
                        <span className="font-display font-bold text-base text-pine">
                          {t.grandTotalLabel}
                        </span>
                        <span className="font-mono font-bold text-xl text-pine">
                          {parsedInvoice.grandTotal.toFixed(2)} {parsedInvoice.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible EN 16931 Business Rules Audit Drawer (Hidden in Print) */}
                <div className="print:hidden border-t border-stoneborder bg-ivory/70">
                  <button
                    type="button"
                    onClick={() => setShowRulesDrawer(!showRulesDrawer)}
                    className="w-full px-6 py-3.5 flex items-center justify-between text-left hover:bg-ivory transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-pine" />
                      <span className="font-display font-semibold text-xs sm:text-sm text-ink">
                        {t.en16931DrawerTitle}
                      </span>
                    </div>
                    {showRulesDrawer ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </button>

                  {showRulesDrawer && (
                    <div className="px-6 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {parsedInvoice.validationRules.map((rule) => (
                        <div
                          key={rule.ruleId}
                          className={`rounded-xl p-3.5 border text-xs flex items-start gap-3 ${
                            rule.passed
                              ? "bg-white border-stoneborder"
                              : "bg-amber-50/80 border-amber-300"
                          }`}
                        >
                          {rule.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="font-mono font-bold text-ink">{rule.ruleId}</span>
                              <span className="font-semibold text-ink truncate">{rule.title}</span>
                            </div>
                            <p className="text-muted text-[11px] mb-1">{rule.description}</p>
                            {rule.actualValue && (
                              <div className="font-mono text-[11px] text-pine bg-ledger px-2 py-0.5 rounded truncate">
                                {rule.actualValue}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsible Raw XML Inspector Drawer (Hidden in Print) */}
                <div className="print:hidden border-t border-stoneborder bg-ivory/40">
                  <button
                    type="button"
                    onClick={() => setShowRawXmlDrawer(!showRawXmlDrawer)}
                    className="w-full px-6 py-3 flex items-center justify-between text-left hover:bg-ivory transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-copper" />
                      <span className="font-display font-semibold text-xs text-muted">
                        {t.rawXmlDrawerTitle}
                      </span>
                    </div>
                    {showRawXmlDrawer ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </button>
                  {showRawXmlDrawer && (
                    <div className="px-6 pb-6">
                      <pre className="p-4 rounded-xl bg-[#191918] text-[#F6F3EC] font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
                        {parsedInvoice.rawXml}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GENERATE OFFICIAL E-INVOICE XML                    */}
        {/* ========================================================= */}
        {activeTab === "generate" && (
          <div className="rounded-2xl bg-ivory border border-stoneborder shadow-ledger p-6 sm:p-8 space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stoneborder">
              <div>
                <h2 className="font-display font-bold text-xl text-ink">{t.genTitle}</h2>
                <p className="text-xs text-muted mt-0.5">{t.genSub}</p>
              </div>

              {/* Standard Selector */}
              <div className="flex flex-col">
                <label className="text-[11px] font-mono uppercase text-muted mb-1">
                  {t.outputStandardLabel}
                </label>
                <select
                  value={genStandard}
                  onChange={(e) => setGenStandard(e.target.value as GeneratorStandard)}
                  className="rounded-xl bg-white border border-stoneborder px-3.5 py-2 text-xs font-mono font-semibold text-pine focus:outline-none focus:border-pine"
                >
                  <option value="PEPPOL_BIS_3">PEPPOL BIS Billing 3.0 (UBL 2.1)</option>
                  <option value="XRECHNUNG_3">XRechnung 3.0 Germany (UBL 2.1)</option>
                  <option value="FACTURAE_322">Facturae 3.2.2 Spain (FACe .xml)</option>
                </select>
              </div>
            </div>

            {/* Core Metadata Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">{t.invoiceNo}</label>
                <input
                  type="text"
                  value={genInvoiceNumber}
                  onChange={(e) => setGenInvoiceNumber(e.target.value)}
                  className="w-full rounded-xl bg-white border border-stoneborder px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">{t.issueDate}</label>
                <input
                  type="date"
                  value={genIssueDate}
                  onChange={(e) => setGenIssueDate(e.target.value)}
                  className="w-full rounded-xl bg-white border border-stoneborder px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">{t.dueDate}</label>
                <input
                  type="date"
                  value={genDueDate}
                  onChange={(e) => setGenDueDate(e.target.value)}
                  className="w-full rounded-xl bg-white border border-stoneborder px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">{t.buyerRef}</label>
                <input
                  type="text"
                  value={genBuyerRef}
                  onChange={(e) => setGenBuyerRef(e.target.value)}
                  placeholder="Leitweg-ID / PO / DIR3"
                  className="w-full rounded-xl bg-white border border-stoneborder px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">{t.currency}</label>
                <select
                  value={genCurrency}
                  onChange={(e) => setGenCurrency(e.target.value as "EUR" | "USD" | "GBP")}
                  className="w-full rounded-xl bg-white border border-stoneborder px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            {/* Seller & Buyer Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Box */}
              <div className="rounded-xl bg-white border border-stoneborder p-5 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase text-pine">
                  {t.sellerCard}
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Company / Legal Name</label>
                  <input
                    type="text"
                    value={genSellerName}
                    onChange={(e) => setGenSellerName(e.target.value)}
                    className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs text-muted mb-1">{t.vatIdLabel}</label>
                    <input
                      type="text"
                      value={genSellerVat}
                      onChange={(e) => setGenSellerVat(e.target.value)}
                      className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">{t.countryLabel}</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={genSellerCountry}
                      onChange={(e) => setGenSellerCountry(e.target.value.toUpperCase())}
                      className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm font-mono uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">{t.addressLabel}</label>
                  <input
                    type="text"
                    value={genSellerAddress}
                    onChange={(e) => setGenSellerAddress(e.target.value)}
                    className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Buyer Box */}
              <div className="rounded-xl bg-white border border-stoneborder p-5 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase text-copper">
                  {t.buyerCard}
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Buyer / Customer Legal Name</label>
                  <input
                    type="text"
                    value={genBuyerName}
                    onChange={(e) => setGenBuyerName(e.target.value)}
                    className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs text-muted mb-1">{t.vatIdLabel}</label>
                    <input
                      type="text"
                      value={genBuyerVat}
                      onChange={(e) => setGenBuyerVat(e.target.value)}
                      className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">{t.countryLabel}</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={genBuyerCountry}
                      onChange={(e) => setGenBuyerCountry(e.target.value.toUpperCase())}
                      className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm font-mono uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">{t.addressLabel}</label>
                  <input
                    type="text"
                    value={genBuyerAddress}
                    onChange={(e) => setGenBuyerAddress(e.target.value)}
                    className="w-full rounded-lg bg-ledger/50 border border-stoneborder px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Line Items Editor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm uppercase tracking-wider text-muted">
                  {t.lineItemsTitle}
                </span>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-pine/10 text-pine hover:bg-pine hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addLineBtn}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {genLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center bg-white p-3 rounded-xl border border-stoneborder"
                  >
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={line.description}
                        onChange={(e) => updateLineItem(idx, "description", e.target.value)}
                        placeholder="Item description"
                        className="w-full rounded-lg bg-ledger/40 border border-stoneborder px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        min="1"
                        step="any"
                        value={line.quantity}
                        onChange={(e) => updateLineItem(idx, "quantity", parseFloat(e.target.value) || 0)}
                        className="w-full rounded-lg bg-ledger/40 border border-stoneborder px-2.5 py-1.5 text-sm font-mono text-right"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        step="0.01"
                        value={line.unitPrice}
                        onChange={(e) => updateLineItem(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                        className="w-full rounded-lg bg-ledger/40 border border-stoneborder px-2.5 py-1.5 text-sm font-mono text-right"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <input
                        type="number"
                        step="0.1"
                        value={line.vatRate}
                        onChange={(e) => updateLineItem(idx, "vatRate", parseFloat(e.target.value) || 0)}
                        className="w-full rounded-lg bg-ledger/40 border border-stoneborder px-2 py-1.5 text-sm font-mono text-right"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-end gap-2">
                      <span className="font-mono font-semibold text-sm text-ink">
                        {line.lineTotal.toFixed(2)} {genCurrency}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLineItem(idx)}
                        disabled={genLines.length <= 1}
                        className="p-1.5 rounded-lg text-muted hover:text-red-600 disabled:opacity-30"
                        aria-label="Remove line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IBAN + Calculated Totals & Export Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-3 border-t border-stoneborder items-center">
              <div className="md:col-span-6">
                <label className="block text-xs font-medium text-ink mb-1">{t.paymentIban}</label>
                <input
                  type="text"
                  value={genIban}
                  onChange={(e) => setGenIban(e.target.value)}
                  className="w-full rounded-xl bg-white border border-stoneborder px-3.5 py-2 text-sm font-mono"
                />
              </div>

              <div className="md:col-span-6 bg-white rounded-xl border border-stoneborder p-4 space-y-1.5">
                <div className="flex justify-between text-xs text-muted">
                  <span>{t.taxSubtotalLabel}</span>
                  <span className="font-mono font-semibold text-ink">
                    {generatedResult.taxSubtotal.toFixed(2)} {genCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>{t.taxAmountLabel}</span>
                  <span className="font-mono font-semibold text-ink">
                    {generatedResult.taxAmount.toFixed(2)} {genCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-base font-display font-bold text-pine pt-1.5 border-t border-stoneborder">
                  <span>{t.grandTotalLabel}</span>
                  <span className="font-mono">
                    {generatedResult.grandTotal.toFixed(2)} {genCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Generator Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowGenXmlPreview(!showGenXmlPreview)}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-copper hover:underline"
              >
                <Code2 className="w-4 h-4" />
                <span>{t.liveXmlPreviewTitle}</span>
                {showGenXmlPreview ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenGeneratedInReader}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-stoneborder hover:border-pine text-ink transition-colors"
                >
                  <Printer className="w-4 h-4 text-pine" />
                  <span>{t.loadInReaderBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadGeneratedXml}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-pine hover:bg-pine-hover text-white shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadXmlBtn}</span>
                </button>
              </div>
            </div>

            {showGenXmlPreview && (
              <div className="space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedResult.xml);
                      setCopiedXml(true);
                      setTimeout(() => setCopiedXml(false), 2000);
                    }}
                    className="px-3 py-1 rounded-lg bg-ledger border border-stoneborder text-xs font-mono font-medium text-ink hover:bg-white"
                  >
                    {copiedXml ? t.copiedBtn : t.copyXmlBtn}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#191918] text-[#F6F3EC] font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
                  {generatedResult.xml}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PROGRAMMATIC SEO TOOLS DIRECTORY (Hidden in Print)        */}
        {/* ========================================================= */}
        <section className="print:hidden mt-16 pt-12 border-t border-stoneborder">
          <div className="max-w-2xl mb-7">
            <h2 className="font-display font-bold text-2xl text-ink mb-2">
              {t.toolsDirectoryTitle}
            </h2>
            <p className="text-sm text-muted">{t.toolsDirectorySub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEO_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl bg-ivory hover:bg-white border border-stoneborder hover:border-pine/50 p-5 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="inline-block font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-ledger text-copper border border-stoneborder mb-3">
                    {tool.badge}
                  </span>
                  <h3 className="font-display font-bold text-sm text-ink group-hover:text-pine transition-colors mb-1.5">
                    {tool.h1}
                  </h3>
                  <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                    {tool.metaDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stoneborder/60 flex items-center justify-between text-xs font-semibold text-pine">
                  <span>Open Utility</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="print:hidden border-t border-stoneborder bg-ivory mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-2.5">
            <InvoiceBrandLogo className="w-6 h-6" />
            <span className="font-display font-bold text-ink">XMLInvoice.studio</span>
            <span>·</span>
            <span>CEN EN 16931 · PEPPOL BIS 3.0 · XRechnung 3.0 · Facturae 3.2.2</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-pine" />
            <span>100% Client-Side Browser Engine · Zero Telemetry</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
