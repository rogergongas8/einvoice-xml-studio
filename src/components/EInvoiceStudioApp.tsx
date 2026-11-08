"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
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

export function EInvoiceStudioApp({
  initialTab = "read",
  initialPreset = "xrechnung",
  initialGeneratorStandard = "PEPPOL_BIS_3",
  customHero,
}: EInvoiceStudioAppProps) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const isEn = lang === "en";

  const [activeTab, setActiveTab] = useState<"read" | "generate">(initialTab);
  const [selectedPreset, setSelectedPreset] = useState<
    "xrechnung" | "peppol" | "facturae" | "custom"
  >(initialPreset);
  const [uploadedFilename, setUploadedFilename] = useState<string>(
    SAMPLE_PRESETS[initialPreset].filename
  );
  const [parsedInvoice, setParsedInvoice] = useState<ParsedEInvoice | null>(
    null
  );
  const [parseError, setParseError] = useState<string | null>(null);
  const [showRulesDrawer, setShowRulesDrawer] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generator State
  const [genStandard, setGenStandard] = useState<GeneratorStandard>(
    initialGeneratorStandard
  );
  const [genInvoiceNumber, setGenInvoiceNumber] =
    useState<string>("INV-2026-0940");
  const [genIssueDate, setGenIssueDate] = useState<string>("2026-03-25");
  const [genDueDate, setGenDueDate] = useState<string>("2026-04-24");
  const [genCurrency, setGenCurrency] = useState<"EUR" | "USD" | "GBP">("EUR");
  const [genBuyerRef, setGenBuyerRef] = useState<string>("991-40219-88");
  const [genSellerName, setGenSellerName] = useState<string>(
    "Alpine Systems GmbH"
  );
  const [genSellerVat, setGenSellerVat] = useState<string>("DE301948271");
  const [genSellerCountry, setGenSellerCountry] = useState<string>("DE");
  const [genSellerAddress, setGenSellerAddress] = useState<string>(
    "Maximilianstraße 35, 80539 München"
  );
  const [genBuyerName, setGenBuyerName] = useState<string>(
    "EuroRail Logistics AG"
  );
  const [genBuyerVat, setGenBuyerVat] = useState<string>("DE812940192");
  const [genBuyerCountry, setGenBuyerCountry] = useState<string>("DE");
  const [genBuyerAddress, setGenBuyerAddress] = useState<string>(
    "Potsdamer Platz 10, 10785 Berlin"
  );
  const [genIban, setGenIban] = useState<string>("DE89370400440532013000");
  const [genLines, setGenLines] = useState<InvoiceLineItem[]>([
    {
      id: "1",
      description: "Cloud Software License & Support",
      quantity: 2,
      unitPrice: 1250,
      vatRate: 19,
      lineTotal: 2500,
    },
    {
      id: "2",
      description: "Technical Onboarding (Hours)",
      quantity: 10,
      unitPrice: 110,
      vatRate: 19,
      lineTotal: 1100,
    },
  ]);

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
      setParseError(
        err instanceof Error ? err.message : "Failed to parse preset XML"
      );
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
          err instanceof Error ? err.message : "Unable to parse XML file."
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
    a.download = `${parsedInvoice.invoiceNumber || "einvoice"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
    const blob = new Blob([generatedResult.xml], {
      type: "application/xml;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generatedResult.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateLineItem = (
    idx: number,
    field: keyof InvoiceLineItem,
    value: string | number
  ) => {
    setGenLines((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        const updated = { ...item, [field]: value };
        updated.lineTotal = Number(
          (Number(updated.quantity) * Number(updated.unitPrice)).toFixed(2)
        );
        return updated;
      })
    );
  };

  const addLineItem = () => {
    setGenLines((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        description: isEn ? "Consulting Service" : "Servicio profesional",
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
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900">
      {/* Minimalist Top Bar */}
      <header className="print:hidden sticky top-0 z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <InvoiceBrandLogo className="w-7 h-7" />
            <span className="font-semibold text-base tracking-tight text-neutral-900">
              XMLInvoice
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            {/* Mode Switcher right in Header */}
            <div className="flex rounded-lg bg-neutral-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("read")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === "read"
                    ? "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {isEn ? "Read XML" : "Abrir XML"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("generate")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === "generate"
                    ? "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {isEn ? "Create XML" : "Crear XML"}
              </button>
            </div>

            {/* Language Switcher EN | ES */}
            <div className="flex rounded-lg bg-neutral-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-1.5 rounded-md transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-2 py-1.5 rounded-md transition-all cursor-pointer ${
                  lang === "es"
                    ? "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Clean, Short Intro */}
        <div className="print:hidden mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {customHero
              ? customHero.h1
              : activeTab === "read"
              ? isEn
                ? "E-Invoice XML Reader"
                : "Visor de Facturas XML"
              : isEn
              ? "Create Official E-Invoice XML"
              : "Crear Factura Electrónica XML"}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {customHero
              ? customHero.subtitle
              : activeTab === "read"
              ? isEn
                ? "Open any PEPPOL, XRechnung, UBL, or Facturae .xml file to view, print as PDF, or export to Excel."
                : "Abre cualquier archivo .xml (Facturae, PEPPOL o XRechnung) para verlo en formato factura, guardarlo en PDF o pasarlo a Excel."
              : isEn
              ? "Fill in the invoice details below to download a validated PEPPOL, XRechnung, or Facturae XML file."
              : "Rellena los datos de la factura para descargar el archivo .XML oficial validado."}
          </p>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: READ XML                                           */}
        {/* ========================================================= */}
        {activeTab === "read" && (
          <div className="space-y-6">
            {/* Compact Upload Bar */}
            <div className="print:hidden bg-white rounded-xl border border-neutral-200/90 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-neutral-300 hover:border-neutral-900 bg-neutral-50/60 hover:bg-neutral-50 cursor-pointer transition-colors"
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
                <Upload className="w-4 h-4 text-neutral-600 shrink-0" />
                <div className="text-left">
                  <span className="text-xs font-medium text-neutral-900 block">
                    {isEn
                      ? "Upload .XML invoice file (or drag & drop)"
                      : "Subir archivo .XML de factura (o arrastrar aquí)"}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    PEPPOL · XRechnung · UBL 2.1 · ZUGFeRD · Facturae
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs shrink-0">
                <span className="text-neutral-400 mr-1">
                  {isEn ? "Samples:" : "Ejemplos:"}
                </span>
                {(
                  [
                    { key: "xrechnung", label: "XRechnung" },
                    { key: "peppol", label: "PEPPOL" },
                    { key: "facturae", label: "Facturae" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleLoadPreset(item.key)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedPreset === item.key
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {parseError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Clean Printable Invoice Sheet */}
            {parsedInvoice && (
              <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden print:shadow-none print:border-none">
                {/* Top Action Bar */}
                <div className="print:hidden px-6 py-3.5 bg-neutral-50/70 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {parsedInvoice.isValid ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isEn ? "Valid XML" : "XML Válido"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {isEn ? "Check warnings" : "Revisar avisos"}
                      </span>
                    )}
                    <span className="text-xs text-neutral-400">
                      {parsedInvoice.standardType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="h-9 px-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{isEn ? "Save as PDF" : "Guardar PDF"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="h-9 px-3.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>{isEn ? "Export Excel (.CSV)" : "Descargar Excel"}</span>
                    </button>
                  </div>
                </div>

                {/* Clean Invoice Document Layout */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Header Row: Invoice Number & Dates */}
                  <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-neutral-100">
                    <div>
                      <span className="text-xs text-neutral-400 block">
                        {isEn ? "Invoice" : "Factura"}
                      </span>
                      <h2 className="text-xl font-bold text-neutral-900 mt-0.5">
                        {parsedInvoice.invoiceNumber || "—"}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-6 text-xs">
                      <div>
                        <span className="text-neutral-400 block">
                          {isEn ? "Issue Date" : "Fecha"}
                        </span>
                        <strong className="font-medium text-neutral-900 mt-0.5 block">
                          {parsedInvoice.issueDate || "—"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">
                          {isEn ? "Due Date" : "Vencimiento"}
                        </span>
                        <strong className="font-medium text-neutral-900 mt-0.5 block">
                          {parsedInvoice.dueDate || "—"}
                        </strong>
                      </div>
                      {parsedInvoice.buyerReference && (
                        <div>
                          <span className="text-neutral-400 block">
                            {isEn ? "Reference" : "Referencia"}
                          </span>
                          <strong className="font-medium text-neutral-900 mt-0.5 block">
                            {parsedInvoice.buyerReference}
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seller & Buyer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-neutral-400 font-medium block mb-1">
                        {isEn ? "From (Seller)" : "De (Emisor)"}
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">
                        {parsedInvoice.seller.name || "—"}
                      </p>
                      <p className="text-neutral-500 mt-0.5">
                        {parsedInvoice.seller.vatId}
                      </p>
                      {parsedInvoice.seller.address && (
                        <p className="text-neutral-500 mt-0.5">
                          {parsedInvoice.seller.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="text-neutral-400 font-medium block mb-1">
                        {isEn ? "Bill To (Buyer)" : "Para (Cliente)"}
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">
                        {parsedInvoice.buyer.name || "—"}
                      </p>
                      <p className="text-neutral-500 mt-0.5">
                        {parsedInvoice.buyer.vatId}
                      </p>
                      {parsedInvoice.buyer.address && (
                        <p className="text-neutral-500 mt-0.5">
                          {parsedInvoice.buyer.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 text-neutral-400 font-medium">
                          <th className="py-2.5 pr-4">
                            {isEn ? "Description" : "Concepto"}
                          </th>
                          <th className="py-2.5 px-3 text-right">
                            {isEn ? "Qty" : "Cant."}
                          </th>
                          <th className="py-2.5 px-3 text-right">
                            {isEn ? "Unit Price" : "Precio"}
                          </th>
                          <th className="py-2.5 px-3 text-right">
                            {isEn ? "Tax" : "IVA"}
                          </th>
                          <th className="py-2.5 pl-3 text-right">
                            {isEn ? "Amount" : "Importe"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        {parsedInvoice.lineItems.map((line, i) => (
                          <tr key={`${line.id}-${i}`}>
                            <td className="py-3 pr-4 font-medium text-neutral-900">
                              {line.description}
                            </td>
                            <td className="py-3 px-3 text-right">
                              {line.quantity}
                            </td>
                            <td className="py-3 px-3 text-right">
                              {line.unitPrice.toFixed(2)} {parsedInvoice.currency}
                            </td>
                            <td className="py-3 px-3 text-right text-neutral-400">
                              {line.vatRate.toFixed(0)}%
                            </td>
                            <td className="py-3 pl-3 text-right font-semibold text-neutral-900">
                              {line.lineTotal.toFixed(2)} {parsedInvoice.currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals & IBAN */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                    <div className="text-xs text-neutral-500">
                      {parsedInvoice.iban && (
                        <div>
                          <span className="text-neutral-400 block">
                            {isEn ? "Payment IBAN" : "IBAN de pago"}
                          </span>
                          <strong className="font-mono text-neutral-800">
                            {parsedInvoice.iban}
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className="w-full sm:w-64 space-y-2 text-xs">
                      <div className="flex justify-between text-neutral-500">
                        <span>{isEn ? "Subtotal" : "Subtotal"}</span>
                        <span>
                          {parsedInvoice.taxSubtotal.toFixed(2)}{" "}
                          {parsedInvoice.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>{isEn ? "Tax / VAT" : "Impuestos / IVA"}</span>
                        <span>
                          {parsedInvoice.taxAmount.toFixed(2)}{" "}
                          {parsedInvoice.currency}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                        <span>{isEn ? "Total" : "Total"}</span>
                        <span>
                          {parsedInvoice.grandTotal.toFixed(2)}{" "}
                          {parsedInvoice.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Collapsible Technical Check (Closed by default) */}
                <div className="print:hidden border-t border-neutral-100 bg-neutral-50/50 px-6 py-2.5">
                  <button
                    type="button"
                    onClick={() => setShowRulesDrawer(!showRulesDrawer)}
                    className="w-full flex items-center justify-between text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    <span>
                      {isEn
                        ? "Technical compliance details (EN 16931)"
                        : "Ver detalles de validación técnica (EN 16931)"}
                    </span>
                    {showRulesDrawer ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showRulesDrawer && (
                    <div className="mt-3 pt-3 border-t border-neutral-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
                      {parsedInvoice.validationRules.map((rule) => (
                        <div
                          key={rule.ruleId}
                          className="text-xs flex items-center gap-2 text-neutral-600"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>
                            <strong>{rule.ruleId}:</strong> {rule.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GENERATE XML                                       */}
        {/* ========================================================= */}
        {activeTab === "generate" && (
          <div className="bg-white rounded-xl border border-neutral-200/90 p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">
                  {isEn ? "Format" : "Formato"}
                </label>
                <select
                  value={genStandard}
                  onChange={(e) =>
                    setGenStandard(e.target.value as GeneratorStandard)
                  }
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900"
                >
                  <option value="PEPPOL_BIS_3">PEPPOL UBL 2.1</option>
                  <option value="XRECHNUNG_UBL">XRechnung (DE)</option>
                  <option value="FACTURAE_322">Facturae 3.2.2 (ES)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">
                  {isEn ? "Invoice Number" : "Nº Factura"}
                </label>
                <input
                  type="text"
                  value={genInvoiceNumber}
                  onChange={(e) => setGenInvoiceNumber(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">
                  {isEn ? "Issue Date" : "Fecha"}
                </label>
                <input
                  type="date"
                  value={genIssueDate}
                  onChange={(e) => setGenIssueDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">
                  {isEn ? "Currency" : "Moneda"}
                </label>
                <select
                  value={genCurrency}
                  onChange={(e) =>
                    setGenCurrency(e.target.value as "EUR" | "USD" | "GBP")
                  }
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-neutral-100">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-neutral-900">
                  {isEn ? "Seller (Your Business)" : "Datos del Emisor"}
                </h3>
                <input
                  type="text"
                  placeholder={isEn ? "Company Name" : "Nombre o Razón Social"}
                  value={genSellerName}
                  onChange={(e) => setGenSellerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder={isEn ? "VAT / Tax ID" : "NIF / IVA"}
                    value={genSellerVat}
                    onChange={(e) => setGenSellerVat(e.target.value)}
                    className="col-span-2 h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="Country (DE/ES)"
                    value={genSellerCountry}
                    onChange={(e) =>
                      setGenSellerCountry(e.target.value.toUpperCase())
                    }
                    className="h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                  />
                </div>
                <input
                  type="text"
                  placeholder={isEn ? "Address" : "Dirección"}
                  value={genSellerAddress}
                  onChange={(e) => setGenSellerAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-neutral-900">
                  {isEn ? "Buyer (Client)" : "Datos del Cliente"}
                </h3>
                <input
                  type="text"
                  placeholder={isEn ? "Client Name" : "Nombre del Cliente"}
                  value={genBuyerName}
                  onChange={(e) => setGenBuyerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder={isEn ? "Client VAT ID" : "NIF Cliente"}
                    value={genBuyerVat}
                    onChange={(e) => setGenBuyerVat(e.target.value)}
                    className="col-span-2 h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="Country"
                    value={genBuyerCountry}
                    onChange={(e) =>
                      setGenBuyerCountry(e.target.value.toUpperCase())
                    }
                    className="h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                  />
                </div>
                <input
                  type="text"
                  placeholder={isEn ? "Client Address" : "Dirección Cliente"}
                  value={genBuyerAddress}
                  onChange={(e) => setGenBuyerAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-neutral-900">
                  {isEn ? "Invoice Items" : "Conceptos"}
                </h3>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isEn ? "Add item" : "Añadir línea"}</span>
                </button>
              </div>

              <div className="space-y-2">
                {genLines.map((line, idx) => (
                  <div
                    key={line.id}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={line.description}
                      onChange={(e) =>
                        updateLineItem(idx, "description", e.target.value)
                      }
                      className="col-span-6 h-9 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900"
                    />
                    <input
                      type="number"
                      min="1"
                      value={line.quantity}
                      onChange={(e) =>
                        updateLineItem(idx, "quantity", Number(e.target.value))
                      }
                      className="col-span-2 h-9 px-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-right text-neutral-900"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={line.unitPrice}
                      onChange={(e) =>
                        updateLineItem(idx, "unitPrice", Number(e.target.value))
                      }
                      className="col-span-3 h-9 px-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-right text-neutral-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeLineItem(idx)}
                      className="col-span-1 flex justify-center text-neutral-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm font-bold text-neutral-900">
                Total: {generatedResult.grandTotal.toFixed(2)} {genCurrency}
              </div>

              <button
                type="button"
                onClick={handleDownloadGeneratedXml}
                className="h-10 px-5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isEn ? "Download .XML Invoice" : "Descargar Factura .XML"}
                </span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="print:hidden mt-16 border-t border-neutral-200/80 bg-white py-8 px-4 sm:px-6 text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {SEO_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 hover:border-neutral-400 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {tool.shortTitle}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between text-neutral-400 pt-2 border-t border-neutral-100">
            <span>XMLInvoice.studio · PEPPOL · XRechnung · Facturae</span>
            <span>100% Client-Side</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
