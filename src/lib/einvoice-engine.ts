export type StandardType =
  | "XRechnung 3.0 (UBL 2.1)"
  | "PEPPOL BIS Billing 3.0 (UBL 2.1)"
  | "ZUGFeRD / Factur-X (UN/CEFACT CII)"
  | "Facturae 3.2.2 (Spain)";

export type GeneratorStandard =
  | "PEPPOL_BIS_3"
  | "XRECHNUNG_3"
  | "FACTURAE_322";

export interface PartyInfo {
  name: string;
  vatId: string;
  country: string;
  address: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  lineTotal: number;
}

export interface ValidationRuleResult {
  ruleId: string;
  title: string;
  description: string;
  passed: boolean;
  severity: "error" | "warning";
  actualValue?: string;
}

export interface ParsedEInvoice {
  standardType: StandardType;
  specificationId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  buyerReference: string;
  seller: PartyInfo;
  buyer: PartyInfo;
  iban: string;
  lineItems: InvoiceLineItem[];
  taxSubtotal: number;
  taxAmount: number;
  grandTotal: number;
  validationRules: ValidationRuleResult[];
  isValid: boolean;
  rawXml: string;
}

export interface GeneratorFormInput {
  standard: GeneratorStandard;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: "EUR" | "USD" | "GBP";
  buyerReference: string;
  sellerName: string;
  sellerVatId: string;
  sellerCountry: string;
  sellerAddress: string;
  buyerName: string;
  buyerVatId: string;
  buyerCountry: string;
  buyerAddress: string;
  iban: string;
  lineItems: InvoiceLineItem[];
}

export const SAMPLE_PRESETS: Record<
  "xrechnung" | "peppol" | "facturae",
  {
    id: "xrechnung" | "peppol" | "facturae";
    labelEn: string;
    labelEs: string;
    badge: string;
    filename: string;
    xml: string;
  }
> = {
  xrechnung: {
    id: "xrechnung",
    labelEn: "German XRechnung 3.0 (UBL 2.1)",
    labelEs: "XRechnung 3.0 Alemania (UBL 2.1)",
    badge: "DE · KoSIT 3.0",
    filename: "XRechnung-3.0-DE-2026-0842.xml",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>XR-2026-0842</cbc:ID>
  <cbc:IssueDate>2026-03-18</cbc:IssueDate>
  <cbc:DueDate>2026-04-17</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>991-12849-74</cbc:BuyerReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>RheinWerk Industrietechnik GmbH</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Königsallee 92</cbc:StreetName>
        <cbc:CityName>Düsseldorf</cbc:CityName>
        <cbc:PostalZone>40212</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>DE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>DE284910482</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>RheinWerk Industrietechnik GmbH</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>Bundesamt für Infrastruktur &amp; Digitalisierung</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Friedrichstraße 108</cbc:StreetName>
        <cbc:CityName>Berlin</cbc:CityName>
        <cbc:PostalZone>10117</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>DE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>DE119384750</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>Bundesamt für Infrastruktur &amp; Digitalisierung</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>58</cbc:PaymentMeansCode>
    <cac:PayeeFinancialAccount>
      <cbc:ID>DE89370400440532013000</cbc:ID>
    </cac:PayeeFinancialAccount>
  </cac:PaymentMeans>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">912.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">4800.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">912.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">4800.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">4800.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">5712.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">5712.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="HUR">24</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">3360.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>EN 16931 ERP Gateway Architecture &amp; KoSIT Integration</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">140.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
  <cac:InvoiceLine>
    <cbc:ID>2</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">1</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">1440.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>Annual Enterprise Security Audit &amp; TLS HSM Certificate</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">1440.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`,
  },
  peppol: {
    id: "peppol",
    labelEn: "European PEPPOL BIS Billing 3.0 (UBL 2.1)",
    labelEs: "PEPPOL BIS Billing 3.0 Europeo (UBL 2.1)",
    badge: "EU · PEPPOL 3.0",
    filename: "PEPPOL-BIS3-INV-2026-419.xml",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>PEP-2026-4190</cbc:ID>
  <cbc:IssueDate>2026-03-20</cbc:IssueDate>
  <cbc:DueDate>2026-04-19</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>PO-EU-88412</cbc:BuyerReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>Nordic Ledger Systems B.V.</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Herengracht 450</cbc:StreetName>
        <cbc:CityName>Amsterdam</cbc:CityName>
        <cbc:PostalZone>1017 CA</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>NL</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>NL854192038B01</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>Nordic Ledger Systems B.V.</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>Vandenberg Logistics Group N.V.</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Avenue Louise 240</cbc:StreetName>
        <cbc:CityName>Brussels</cbc:CityName>
        <cbc:PostalZone>1050</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>BE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>BE0472918345</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>Vandenberg Logistics Group N.V.</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>58</cbc:PaymentMeansCode>
    <cac:PayeeFinancialAccount>
      <cbc:ID>NL91ABNA0417164300</cbc:ID>
    </cac:PayeeFinancialAccount>
  </cac:PaymentMeans>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">672.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">3200.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">672.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>21.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">3200.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">3200.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">3872.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">3872.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">4</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">2400.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>PEPPOL Access Point SMP Node Provisioning (Quarterly)</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>21.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">600.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
  <cac:InvoiceLine>
    <cbc:ID>2</cbc:ID>
    <cbc:InvoicedQuantity unitCode="HUR">8</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">800.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>AS4 EDI Telemetry &amp; Automated Tax Reconciliation Setup</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>21.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`,
  },
  facturae: {
    id: "facturae",
    labelEn: "Spanish Facturae 3.2.2 (.xml)",
    labelEs: "Facturae 3.2.2 España (FACe .xml)",
    badge: "ES · FACe 3.2.2",
    filename: "Facturae-3.2.2-ES-FAC-2026-109.xml",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<fe:Facturae xmlns:fe="http://www.facturae.gob.es/formato/Versiones/Facturaev3_2_2.xml">
  <FileHeader>
    <SchemaVersion>3.2.2</SchemaVersion>
    <Modality>I</Modality>
    <InvoiceIssuerType>EM</InvoiceIssuerType>
  </FileHeader>
  <Parties>
    <SellerParty>
      <TaxIdentification>
        <PersonTypeCode>J</PersonTypeCode>
        <ResidenceTypeCode>R</ResidenceTypeCode>
        <TaxIdentificationNumber>ESB84920174</TaxIdentificationNumber>
      </TaxIdentification>
      <LegalEntity>
        <CorporateName>Iberia Sistemas Fiscales S.L.</CorporateName>
        <AddressInSpain>
          <Address>Paseo de la Castellana 140</Address>
          <PostCode>28046</PostCode>
          <Town>Madrid</Town>
          <Province>Madrid</Province>
          <CountryCode>ESP</CountryCode>
        </AddressInSpain>
      </LegalEntity>
    </SellerParty>
    <BuyerParty>
      <TaxIdentification>
        <PersonTypeCode>J</PersonTypeCode>
        <ResidenceTypeCode>R</ResidenceTypeCode>
        <TaxIdentificationNumber>ESA28019485</TaxIdentificationNumber>
      </TaxIdentification>
      <AdministrativeCentres>
        <AdministrativeCentre>
          <CentreCode>EA0041829</CentreCode>
          <RoleTypeCode>01</RoleTypeCode>
        </AdministrativeCentre>
      </AdministrativeCentres>
      <LegalEntity>
        <CorporateName>Consorcio Tecnológico del Mediterráneo S.A.</CorporateName>
        <AddressInSpain>
          <Address>Avinguda Diagonal 532</Address>
          <PostCode>08006</PostCode>
          <Town>Barcelona</Town>
          <Province>Barcelona</Province>
          <CountryCode>ESP</CountryCode>
        </AddressInSpain>
      </LegalEntity>
    </BuyerParty>
  </Parties>
  <Invoices>
    <Invoice>
      <InvoiceHeader>
        <InvoiceNumber>FAC-2026-0109</InvoiceNumber>
        <InvoiceSeriesCode>A</InvoiceSeriesCode>
        <InvoiceDocumentType>FC</InvoiceDocumentType>
        <InvoiceClass>OO</InvoiceClass>
      </InvoiceHeader>
      <InvoiceIssueData>
        <IssueDate>2026-03-22</IssueDate>
        <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
        <TaxCurrencyCode>EUR</TaxCurrencyCode>
        <LanguageName>es</LanguageName>
      </InvoiceIssueData>
      <TaxesOutputs>
        <Tax>
          <TaxTypeCode>01</TaxTypeCode>
          <TaxRate>21.00</TaxRate>
          <TaxableBase>
            <TotalAmount>2650.00</TotalAmount>
          </TaxableBase>
          <TaxAmount>
            <TotalAmount>556.50</TotalAmount>
          </TaxAmount>
        </Tax>
      </TaxesOutputs>
      <InvoiceTotals>
        <TotalGrossAmount>2650.00</TotalGrossAmount>
        <TotalGrossAmountBeforeTaxes>2650.00</TotalGrossAmountBeforeTaxes>
        <TotalTaxOutputs>556.50</TotalTaxOutputs>
        <TotalTaxesWithheld>0.00</TotalTaxesWithheld>
        <InvoiceTotal>3206.50</InvoiceTotal>
        <TotalOutstandingAmount>3206.50</TotalOutstandingAmount>
        <TotalExecutableAmount>3206.50</TotalExecutableAmount>
      </InvoiceTotals>
      <Items>
        <InvoiceLine>
          <ReceiverTransactionReference>DIR3-EA0041829</ReceiverTransactionReference>
          <ItemDescription>Certificación Verifactu &amp; Pasarela FACe 3.2.2</ItemDescription>
          <Quantity>1</Quantity>
          <UnitOfMeasure>01</UnitOfMeasure>
          <UnitPriceWithoutTax>1850.00</UnitPriceWithoutTax>
          <TotalCost>1850.00</TotalCost>
          <GrossAmount>1850.00</GrossAmount>
          <TaxesOutputs>
            <Tax>
              <TaxTypeCode>01</TaxTypeCode>
              <TaxRate>21.00</TaxRate>
              <TaxableBase>
                <TotalAmount>1850.00</TotalAmount>
              </TaxableBase>
              <TaxAmount>
                <TotalAmount>388.50</TotalAmount>
              </TaxAmount>
            </Tax>
          </TaxesOutputs>
        </InvoiceLine>
        <InvoiceLine>
          <ReceiverTransactionReference>DIR3-EA0041829</ReceiverTransactionReference>
          <ItemDescription>Soporte Técnico Firma Electrónica XAdES-EPES (10 Horas)</ItemDescription>
          <Quantity>10</Quantity>
          <UnitOfMeasure>01</UnitOfMeasure>
          <UnitPriceWithoutTax>80.00</UnitPriceWithoutTax>
          <TotalCost>800.00</TotalCost>
          <GrossAmount>800.00</GrossAmount>
          <TaxesOutputs>
            <Tax>
              <TaxTypeCode>01</TaxTypeCode>
              <TaxRate>21.00</TaxRate>
              <TaxableBase>
                <TotalAmount>800.00</TotalAmount>
              </TaxableBase>
              <TaxAmount>
                <TotalAmount>168.00</TotalAmount>
              </TaxAmount>
            </Tax>
          </TaxesOutputs>
        </InvoiceLine>
      </Items>
      <PaymentDetails>
        <Installment>
          <InstallmentDueDate>2026-04-21</InstallmentDueDate>
          <InstallmentAmount>3206.50</InstallmentAmount>
          <PaymentMeans>04</PaymentMeans>
          <AccountToBeCredited>
            <IBAN>ES9121000418450200051332</IBAN>
          </AccountToBeCredited>
        </Installment>
      </PaymentDetails>
    </Invoice>
  </Invoices>
</fe:Facturae>`,
  },
};

function findFirstByLocalName(root: Document | Element, localName: string): Element | null {
  const all = root.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    const elLocal = el.localName || el.tagName.split(":").pop() || "";
    if (elLocal === localName) {
      return el;
    }
  }
  return null;
}

function findAllByLocalName(root: Document | Element, localName: string): Element[] {
  const results: Element[] = [];
  const all = root.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    const elLocal = el.localName || el.tagName.split(":").pop() || "";
    if (elLocal === localName) {
      results.push(el);
    }
  }
  return results;
}

function findDirectOrNestedText(root: Element | null, path: string[]): string {
  if (!root) return "";
  let current: Element | null = root;
  for (const step of path) {
    if (!current) return "";
    current = findFirstByLocalName(current, step);
  }
  return current?.textContent?.trim() || "";
}

function parseNum(val: string | undefined | null, fallback = 0): number {
  if (!val) return fallback;
  const cleaned = val.replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

export function parseEInvoiceXml(xmlString: string): ParsedEInvoice {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString.trim(), "application/xml");
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    throw new Error("Invalid XML syntax: Unable to parse E-Invoice document.");
  }

  const rootEl = doc.documentElement;
  const rootName = rootEl.localName || rootEl.tagName.split(":").pop() || "";

  let standardType: StandardType = "PEPPOL BIS Billing 3.0 (UBL 2.1)";
  let specificationId = "";
  let invoiceNumber = "";
  let issueDate = "";
  let dueDate = "";
  let currency = "EUR";
  let buyerReference = "";
  let seller: PartyInfo = { name: "", vatId: "", country: "", address: "" };
  let buyer: PartyInfo = { name: "", vatId: "", country: "", address: "" };
  let iban = "";
  const lineItems: InvoiceLineItem[] = [];
  let taxSubtotal = 0;
  let taxAmount = 0;
  let grandTotal = 0;

  if (rootName.toLowerCase().includes("facturae")) {
    // Spanish Facturae 3.2.2
    standardType = "Facturae 3.2.2 (Spain)";
    const schemaVer = findFirstByLocalName(doc, "SchemaVersion")?.textContent?.trim() || "3.2.2";
    specificationId = `Facturae-${schemaVer}`;

    invoiceNumber = findFirstByLocalName(doc, "InvoiceNumber")?.textContent?.trim() || "";
    issueDate = findFirstByLocalName(doc, "IssueDate")?.textContent?.trim() || "";
    dueDate = findFirstByLocalName(doc, "InstallmentDueDate")?.textContent?.trim() || "";
    currency = findFirstByLocalName(doc, "InvoiceCurrencyCode")?.textContent?.trim() || "EUR";

    const sellerParty = findFirstByLocalName(doc, "SellerParty");
    const buyerParty = findFirstByLocalName(doc, "BuyerParty");

    const sellerCorp = findDirectOrNestedText(sellerParty, ["CorporateName"]) ||
      [findDirectOrNestedText(sellerParty, ["Name"]), findDirectOrNestedText(sellerParty, ["FirstSurname"])].filter(Boolean).join(" ");
    const sellerTax = findDirectOrNestedText(sellerParty, ["TaxIdentificationNumber"]);
    const sellerStreet = findDirectOrNestedText(sellerParty, ["Address"]);
    const sellerTown = findDirectOrNestedText(sellerParty, ["Town"]);
    const sellerPost = findDirectOrNestedText(sellerParty, ["PostCode"]);
    const sellerCountry = findDirectOrNestedText(sellerParty, ["CountryCode"]) || "ES";

    seller = {
      name: sellerCorp,
      vatId: sellerTax,
      country: sellerCountry,
      address: [sellerStreet, sellerPost, sellerTown].filter(Boolean).join(", "),
    };

    const buyerCorp = findDirectOrNestedText(buyerParty, ["CorporateName"]) ||
      [findDirectOrNestedText(buyerParty, ["Name"]), findDirectOrNestedText(buyerParty, ["FirstSurname"])].filter(Boolean).join(" ");
    const buyerTax = findDirectOrNestedText(buyerParty, ["TaxIdentificationNumber"]);
    const buyerStreet = findDirectOrNestedText(buyerParty, ["Address"]);
    const buyerTown = findDirectOrNestedText(buyerParty, ["Town"]);
    const buyerPost = findDirectOrNestedText(buyerParty, ["PostCode"]);
    const buyerCountry = findDirectOrNestedText(buyerParty, ["CountryCode"]) || "ES";

    buyer = {
      name: buyerCorp,
      vatId: buyerTax,
      country: buyerCountry,
      address: [buyerStreet, buyerPost, buyerTown].filter(Boolean).join(", "),
    };

    buyerReference =
      findDirectOrNestedText(buyerParty, ["CentreCode"]) ||
      findFirstByLocalName(doc, "ReceiverTransactionReference")?.textContent?.trim() ||
      "";

    iban = findFirstByLocalName(doc, "IBAN")?.textContent?.trim() || "";

    const lines = findAllByLocalName(doc, "InvoiceLine");
    lines.forEach((lineEl, idx) => {
      const desc = findDirectOrNestedText(lineEl, ["ItemDescription"]) || `Line ${idx + 1}`;
      const qty = parseNum(findDirectOrNestedText(lineEl, ["Quantity"]), 1);
      const price = parseNum(findDirectOrNestedText(lineEl, ["UnitPriceWithoutTax"]), 0);
      const total = parseNum(findDirectOrNestedText(lineEl, ["GrossAmount"]) || findDirectOrNestedText(lineEl, ["TotalCost"]), qty * price);
      const rate = parseNum(findDirectOrNestedText(lineEl, ["TaxRate"]), 21);
      lineItems.push({
        id: String(idx + 1),
        description: desc,
        quantity: qty,
        unitPrice: price,
        vatRate: rate,
        lineTotal: total,
      });
    });

    const totalsEl = findFirstByLocalName(doc, "InvoiceTotals");
    taxSubtotal = parseNum(
      findDirectOrNestedText(totalsEl, ["TotalGrossAmountBeforeTaxes"]) ||
        findDirectOrNestedText(totalsEl, ["TotalGrossAmount"]),
      lineItems.reduce((acc, l) => acc + l.lineTotal, 0)
    );
    taxAmount = parseNum(findDirectOrNestedText(totalsEl, ["TotalTaxOutputs"]), 0);
    grandTotal = parseNum(findDirectOrNestedText(totalsEl, ["InvoiceTotal"]), taxSubtotal + taxAmount);
  } else if (rootName.includes("CrossIndustryInvoice")) {
    // UN/CEFACT CII (ZUGFeRD / Factur-X)
    standardType = "ZUGFeRD / Factur-X (UN/CEFACT CII)";
    const guidelineEl = findFirstByLocalName(doc, "GuidelineSpecifiedDocumentContextParameter");
    specificationId = findDirectOrNestedText(guidelineEl, ["ID"]) || "urn:cen.eu:en16931:2017";
    if (specificationId.toLowerCase().includes("xrechnung")) {
      standardType = "XRechnung 3.0 (UBL 2.1)";
    }

    const exchangedDoc = findFirstByLocalName(doc, "ExchangedDocument");
    invoiceNumber = findDirectOrNestedText(exchangedDoc, ["ID"]);
    const issueDateStr = findDirectOrNestedText(exchangedDoc, ["DateTimeString"]);
    if (issueDateStr && issueDateStr.length === 8) {
      issueDate = `${issueDateStr.slice(0, 4)}-${issueDateStr.slice(4, 6)}-${issueDateStr.slice(6, 8)}`;
    } else {
      issueDate = issueDateStr;
    }

    buyerReference = findFirstByLocalName(doc, "BuyerReference")?.textContent?.trim() || "";
    currency = findFirstByLocalName(doc, "InvoiceCurrencyCode")?.textContent?.trim() || "EUR";

    const sellerParty = findFirstByLocalName(doc, "SellerTradeParty");
    const buyerParty = findFirstByLocalName(doc, "BuyerTradeParty");

    seller = {
      name: findDirectOrNestedText(sellerParty, ["Name"]),
      vatId: findDirectOrNestedText(sellerParty, ["SpecifiedTaxRegistration", "ID"]),
      country: findDirectOrNestedText(sellerParty, ["PostalTradeAddress", "CountryID"]),
      address: [
        findDirectOrNestedText(sellerParty, ["PostalTradeAddress", "LineOne"]),
        findDirectOrNestedText(sellerParty, ["PostalTradeAddress", "PostcodeCode"]),
        findDirectOrNestedText(sellerParty, ["PostalTradeAddress", "CityName"]),
      ]
        .filter(Boolean)
        .join(", "),
    };

    buyer = {
      name: findDirectOrNestedText(buyerParty, ["Name"]),
      vatId: findDirectOrNestedText(buyerParty, ["SpecifiedTaxRegistration", "ID"]),
      country: findDirectOrNestedText(buyerParty, ["PostalTradeAddress", "CountryID"]),
      address: [
        findDirectOrNestedText(buyerParty, ["PostalTradeAddress", "LineOne"]),
        findDirectOrNestedText(buyerParty, ["PostalTradeAddress", "PostcodeCode"]),
        findDirectOrNestedText(buyerParty, ["PostalTradeAddress", "CityName"]),
      ]
        .filter(Boolean)
        .join(", "),
    };

    iban = findDirectOrNestedText(
      findFirstByLocalName(doc, "PayeePartyCreditorFinancialAccount"),
      ["IBANID"]
    );

    const lines = findAllByLocalName(doc, "IncludedSupplyChainTradeLineItem");
    lines.forEach((lineEl, idx) => {
      const desc = findDirectOrNestedText(lineEl, ["SpecifiedTradeProduct", "Name"]) || `Item ${idx + 1}`;
      const qty = parseNum(findDirectOrNestedText(lineEl, ["BilledQuantity"]), 1);
      const price = parseNum(findDirectOrNestedText(lineEl, ["NetPriceProductTradePrice", "ChargeAmount"]), 0);
      const total = parseNum(findDirectOrNestedText(lineEl, ["SpecifiedTradeSettlementLineMonetarySummation", "LineTotalAmount"]), qty * price);
      const rate = parseNum(findDirectOrNestedText(lineEl, ["ApplicableTradeTax", "RateApplicablePercent"]), 19);
      lineItems.push({
        id: String(idx + 1),
        description: desc,
        quantity: qty,
        unitPrice: price,
        vatRate: rate,
        lineTotal: total,
      });
    });

    const summation = findFirstByLocalName(doc, "SpecifiedTradeSettlementHeaderMonetarySummation");
    taxSubtotal = parseNum(findDirectOrNestedText(summation, ["TaxBasisTotalAmount"]), 0);
    taxAmount = parseNum(findDirectOrNestedText(summation, ["TaxTotalAmount"]), 0);
    grandTotal = parseNum(findDirectOrNestedText(summation, ["GrandTotalAmount"]), taxSubtotal + taxAmount);
  } else {
    // UBL 2.1 (PEPPOL BIS Billing 3.0 or XRechnung)
    specificationId = findFirstByLocalName(doc, "CustomizationID")?.textContent?.trim() || "";
    if (specificationId.toLowerCase().includes("xrechnung")) {
      standardType = "XRechnung 3.0 (UBL 2.1)";
    } else {
      standardType = "PEPPOL BIS Billing 3.0 (UBL 2.1)";
    }

    // Direct child ID of Invoice
    let invId = "";
    for (let i = 0; i < rootEl.children.length; i++) {
      const ch = rootEl.children[i];
      const local = ch.localName || ch.tagName.split(":").pop() || "";
      if (local === "ID") {
        invId = ch.textContent?.trim() || "";
        break;
      }
    }
    invoiceNumber = invId || findFirstByLocalName(doc, "ID")?.textContent?.trim() || "";
    issueDate = findFirstByLocalName(doc, "IssueDate")?.textContent?.trim() || "";
    dueDate = findFirstByLocalName(doc, "DueDate")?.textContent?.trim() || "";
    currency = findFirstByLocalName(doc, "DocumentCurrencyCode")?.textContent?.trim() || "EUR";
    buyerReference = findFirstByLocalName(doc, "BuyerReference")?.textContent?.trim() || "";

    const supplierEl = findFirstByLocalName(doc, "AccountingSupplierParty");
    const customerEl = findFirstByLocalName(doc, "AccountingCustomerParty");

    const sellerName =
      findDirectOrNestedText(supplierEl, ["PartyName", "Name"]) ||
      findDirectOrNestedText(supplierEl, ["PartyLegalEntity", "RegistrationName"]);
    const sellerVat = findDirectOrNestedText(supplierEl, ["PartyTaxScheme", "CompanyID"]);
    const sellerCountry = findDirectOrNestedText(supplierEl, ["PostalAddress", "Country", "IdentificationCode"]);
    const sellerAddress = [
      findDirectOrNestedText(supplierEl, ["PostalAddress", "StreetName"]),
      findDirectOrNestedText(supplierEl, ["PostalAddress", "PostalZone"]),
      findDirectOrNestedText(supplierEl, ["PostalAddress", "CityName"]),
    ]
      .filter(Boolean)
      .join(", ");

    seller = {
      name: sellerName,
      vatId: sellerVat,
      country: sellerCountry,
      address: sellerAddress,
    };

    const buyerName =
      findDirectOrNestedText(customerEl, ["PartyName", "Name"]) ||
      findDirectOrNestedText(customerEl, ["PartyLegalEntity", "RegistrationName"]);
    const buyerVat = findDirectOrNestedText(customerEl, ["PartyTaxScheme", "CompanyID"]);
    const buyerCountry = findDirectOrNestedText(customerEl, ["PostalAddress", "Country", "IdentificationCode"]);
    const buyerAddress = [
      findDirectOrNestedText(customerEl, ["PostalAddress", "StreetName"]),
      findDirectOrNestedText(customerEl, ["PostalAddress", "PostalZone"]),
      findDirectOrNestedText(customerEl, ["PostalAddress", "CityName"]),
    ]
      .filter(Boolean)
      .join(", ");

    buyer = {
      name: buyerName,
      vatId: buyerVat,
      country: buyerCountry,
      address: buyerAddress,
    };

    const payeeAcc = findFirstByLocalName(doc, "PayeeFinancialAccount");
    iban = findDirectOrNestedText(payeeAcc, ["ID"]);

    const ublLines = findAllByLocalName(doc, "InvoiceLine");
    ublLines.forEach((lineEl, idx) => {
      const lineId = findDirectOrNestedText(lineEl, ["ID"]) || String(idx + 1);
      const desc =
        findDirectOrNestedText(lineEl, ["Item", "Name"]) ||
        findDirectOrNestedText(lineEl, ["Item", "Description"]) ||
        `Line Item ${idx + 1}`;
      const qty = parseNum(findDirectOrNestedText(lineEl, ["InvoicedQuantity"]), 1);
      const price = parseNum(findDirectOrNestedText(lineEl, ["Price", "PriceAmount"]), 0);
      const total = parseNum(findDirectOrNestedText(lineEl, ["LineExtensionAmount"]), qty * price);
      const vatRate = parseNum(
        findDirectOrNestedText(lineEl, ["Item", "ClassifiedTaxCategory", "Percent"]),
        19
      );

      lineItems.push({
        id: lineId,
        description: desc,
        quantity: qty,
        unitPrice: price,
        vatRate,
        lineTotal: total,
      });
    });

    const monetaryTotal = findFirstByLocalName(doc, "LegalMonetaryTotal");
    const taxTotalEl = findFirstByLocalName(doc, "TaxTotal");

    taxSubtotal = parseNum(
      findDirectOrNestedText(monetaryTotal, ["TaxExclusiveAmount"]) ||
        findDirectOrNestedText(monetaryTotal, ["LineExtensionAmount"]),
      lineItems.reduce((acc, l) => acc + l.lineTotal, 0)
    );
    taxAmount = parseNum(findDirectOrNestedText(taxTotalEl, ["TaxAmount"]), 0);
    grandTotal = parseNum(
      findDirectOrNestedText(monetaryTotal, ["PayableAmount"]) ||
        findDirectOrNestedText(monetaryTotal, ["TaxInclusiveAmount"]),
      taxSubtotal + taxAmount
    );
  }

  // EN 16931 Business Rules Validation
  const calculatedLinesSum = Number(
    lineItems.reduce((acc, item) => acc + item.lineTotal, 0).toFixed(2)
  );
  const expectedGrandTotal = Number((taxSubtotal + taxAmount).toFixed(2));
  const mathCoherent =
    Math.abs(expectedGrandTotal - grandTotal) <= 0.05 &&
    Math.abs(calculatedLinesSum - taxSubtotal) <= 0.05;

  const validationRules: ValidationRuleResult[] = [
    {
      ruleId: "BR-01",
      title: "Specification Identifier (BT-24)",
      description: "An Invoice shall have a Specification identifier (CustomizationID / SchemaVersion).",
      passed: specificationId.trim().length > 0,
      severity: "error",
      actualValue: specificationId || "Missing",
    },
    {
      ruleId: "BR-02",
      title: "Invoice Number (BT-1)",
      description: "An Invoice shall have a unique Invoice number.",
      passed: invoiceNumber.trim().length > 0,
      severity: "error",
      actualValue: invoiceNumber || "Missing",
    },
    {
      ruleId: "BR-03",
      title: "Invoice Issue Date (BT-2)",
      description: "An Invoice shall have an Invoice issue date in ISO YYYY-MM-DD format.",
      passed: /^\d{4}-\d{2}-\d{2}$/.test(issueDate.trim()),
      severity: "error",
      actualValue: issueDate || "Missing",
    },
    {
      ruleId: "BR-06",
      title: "Seller Name & VAT Identifier (BT-27 / BT-31)",
      description: "An Invoice shall contain the Seller name and registered VAT/Tax identifier.",
      passed: seller.name.trim().length > 0 && seller.vatId.trim().length > 0,
      severity: "error",
      actualValue: seller.name ? `${seller.name} (${seller.vatId || "No VAT"})` : "Missing",
    },
    {
      ruleId: "BR-07",
      title: "Buyer Name (BT-44)",
      description: "An Invoice shall contain the Buyer legal or trading name.",
      passed: buyer.name.trim().length > 0,
      severity: "error",
      actualValue: buyer.name || "Missing",
    },
    {
      ruleId: "BR-16",
      title: "Minimum One Invoice Line (BG-25)",
      description: "An Invoice shall have at least one Invoice line item.",
      passed: lineItems.length >= 1,
      severity: "error",
      actualValue: `${lineItems.length} line item(s)`,
    },
    {
      ruleId: "BR-CO-15",
      title: "Mathematical Tax & Grand Total Coherence",
      description: "Invoice total amount with VAT (BT-112) must equal Tax exclusive amount (BT-109) + VAT total (BT-110).",
      passed: mathCoherent,
      severity: mathCoherent ? "warning" : "error",
      actualValue: `${taxSubtotal.toFixed(2)} + ${taxAmount.toFixed(2)} = ${grandTotal.toFixed(2)} ${currency}`,
    },
  ];

  const isValid = validationRules.every((r) => r.passed);

  return {
    standardType,
    specificationId,
    invoiceNumber,
    issueDate,
    dueDate,
    currency,
    buyerReference,
    seller,
    buyer,
    iban,
    lineItems,
    taxSubtotal,
    taxAmount,
    grandTotal,
    validationRules,
    isValid,
    rawXml: xmlString,
  };
}

export function exportInvoiceLinesToCsv(invoice: ParsedEInvoice): string {
  const headers = [
    "InvoiceNumber",
    "IssueDate",
    "Standard",
    "SellerName",
    "SellerVAT",
    "BuyerName",
    "BuyerReference",
    "LineID",
    "Description",
    "Quantity",
    "UnitPrice",
    "VATRatePercent",
    "LineTotalNet",
    "Currency",
  ];

  const escapeCsv = (val: string | number) => {
    const str = String(val ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = invoice.lineItems.map((item) => [
    invoice.invoiceNumber,
    invoice.issueDate,
    invoice.standardType,
    invoice.seller.name,
    invoice.seller.vatId,
    invoice.buyer.name,
    invoice.buyerReference,
    item.id,
    item.description,
    item.quantity,
    item.unitPrice.toFixed(2),
    item.vatRate.toFixed(2),
    item.lineTotal.toFixed(2),
    invoice.currency,
  ]);

  return [
    headers.join(","),
    ...rows.map((r) => r.map(escapeCsv).join(",")),
  ].join("\n");
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateOfficialEInvoiceXml(input: GeneratorFormInput): {
  xml: string;
  taxSubtotal: number;
  taxAmount: number;
  grandTotal: number;
  filename: string;
} {
  const normalizedLines = input.lineItems.map((item, idx) => {
    const lineTotal = Number((item.quantity * item.unitPrice).toFixed(2));
    return {
      ...item,
      id: String(idx + 1),
      lineTotal,
    };
  });

  const taxSubtotal = Number(
    normalizedLines.reduce((acc, item) => acc + item.lineTotal, 0).toFixed(2)
  );
  const taxAmount = Number(
    normalizedLines
      .reduce((acc, item) => acc + (item.lineTotal * item.vatRate) / 100, 0)
      .toFixed(2)
  );
  const grandTotal = Number((taxSubtotal + taxAmount).toFixed(2));
  const primaryVatRate = normalizedLines[0]?.vatRate ?? 21;

  if (input.standard === "FACTURAE_322") {
    const itemsXml = normalizedLines
      .map((line) => {
        const lineVat = Number(((line.lineTotal * line.vatRate) / 100).toFixed(2));
        return `        <InvoiceLine>
          <ReceiverTransactionReference>${escapeXml(input.buyerReference || "REF-001")}</ReceiverTransactionReference>
          <ItemDescription>${escapeXml(line.description)}</ItemDescription>
          <Quantity>${line.quantity}</Quantity>
          <UnitOfMeasure>01</UnitOfMeasure>
          <UnitPriceWithoutTax>${line.unitPrice.toFixed(2)}</UnitPriceWithoutTax>
          <TotalCost>${line.lineTotal.toFixed(2)}</TotalCost>
          <GrossAmount>${line.lineTotal.toFixed(2)}</GrossAmount>
          <TaxesOutputs>
            <Tax>
              <TaxTypeCode>01</TaxTypeCode>
              <TaxRate>${line.vatRate.toFixed(2)}</TaxRate>
              <TaxableBase>
                <TotalAmount>${line.lineTotal.toFixed(2)}</TotalAmount>
              </TaxableBase>
              <TaxAmount>
                <TotalAmount>${lineVat.toFixed(2)}</TotalAmount>
              </TaxAmount>
            </Tax>
          </TaxesOutputs>
        </InvoiceLine>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<fe:Facturae xmlns:fe="http://www.facturae.gob.es/formato/Versiones/Facturaev3_2_2.xml">
  <FileHeader>
    <SchemaVersion>3.2.2</SchemaVersion>
    <Modality>I</Modality>
    <InvoiceIssuerType>EM</InvoiceIssuerType>
  </FileHeader>
  <Parties>
    <SellerParty>
      <TaxIdentification>
        <PersonTypeCode>J</PersonTypeCode>
        <ResidenceTypeCode>R</ResidenceTypeCode>
        <TaxIdentificationNumber>${escapeXml(input.sellerVatId)}</TaxIdentificationNumber>
      </TaxIdentification>
      <LegalEntity>
        <CorporateName>${escapeXml(input.sellerName)}</CorporateName>
        <AddressInSpain>
          <Address>${escapeXml(input.sellerAddress)}</Address>
          <PostCode>28001</PostCode>
          <Town>Madrid</Town>
          <Province>Madrid</Province>
          <CountryCode>ESP</CountryCode>
        </AddressInSpain>
      </LegalEntity>
    </SellerParty>
    <BuyerParty>
      <TaxIdentification>
        <PersonTypeCode>J</PersonTypeCode>
        <ResidenceTypeCode>R</ResidenceTypeCode>
        <TaxIdentificationNumber>${escapeXml(input.buyerVatId)}</TaxIdentificationNumber>
      </TaxIdentification>
      <AdministrativeCentres>
        <AdministrativeCentre>
          <CentreCode>${escapeXml(input.buyerReference || "EA0000000")}</CentreCode>
          <RoleTypeCode>01</RoleTypeCode>
        </AdministrativeCentre>
      </AdministrativeCentres>
      <LegalEntity>
        <CorporateName>${escapeXml(input.buyerName)}</CorporateName>
        <AddressInSpain>
          <Address>${escapeXml(input.buyerAddress)}</Address>
          <PostCode>08001</PostCode>
          <Town>Barcelona</Town>
          <Province>Barcelona</Province>
          <CountryCode>ESP</CountryCode>
        </AddressInSpain>
      </LegalEntity>
    </BuyerParty>
  </Parties>
  <Invoices>
    <Invoice>
      <InvoiceHeader>
        <InvoiceNumber>${escapeXml(input.invoiceNumber)}</InvoiceNumber>
        <InvoiceSeriesCode>A</InvoiceSeriesCode>
        <InvoiceDocumentType>FC</InvoiceDocumentType>
        <InvoiceClass>OO</InvoiceClass>
      </InvoiceHeader>
      <InvoiceIssueData>
        <IssueDate>${escapeXml(input.issueDate)}</IssueDate>
        <InvoiceCurrencyCode>${escapeXml(input.currency)}</InvoiceCurrencyCode>
        <TaxCurrencyCode>${escapeXml(input.currency)}</TaxCurrencyCode>
        <LanguageName>es</LanguageName>
      </InvoiceIssueData>
      <TaxesOutputs>
        <Tax>
          <TaxTypeCode>01</TaxTypeCode>
          <TaxRate>${primaryVatRate.toFixed(2)}</TaxRate>
          <TaxableBase>
            <TotalAmount>${taxSubtotal.toFixed(2)}</TotalAmount>
          </TaxableBase>
          <TaxAmount>
            <TotalAmount>${taxAmount.toFixed(2)}</TotalAmount>
          </TaxAmount>
        </Tax>
      </TaxesOutputs>
      <InvoiceTotals>
        <TotalGrossAmount>${taxSubtotal.toFixed(2)}</TotalGrossAmount>
        <TotalGrossAmountBeforeTaxes>${taxSubtotal.toFixed(2)}</TotalGrossAmountBeforeTaxes>
        <TotalTaxOutputs>${taxAmount.toFixed(2)}</TotalTaxOutputs>
        <TotalTaxesWithheld>0.00</TotalTaxesWithheld>
        <InvoiceTotal>${grandTotal.toFixed(2)}</InvoiceTotal>
        <TotalOutstandingAmount>${grandTotal.toFixed(2)}</TotalOutstandingAmount>
        <TotalExecutableAmount>${grandTotal.toFixed(2)}</TotalExecutableAmount>
      </InvoiceTotals>
      <Items>
${itemsXml}
      </Items>
      <PaymentDetails>
        <Installment>
          <InstallmentDueDate>${escapeXml(input.dueDate)}</InstallmentDueDate>
          <InstallmentAmount>${grandTotal.toFixed(2)}</InstallmentAmount>
          <PaymentMeans>04</PaymentMeans>
          <AccountToBeCredited>
            <IBAN>${escapeXml(input.iban)}</IBAN>
          </AccountToBeCredited>
        </Installment>
      </PaymentDetails>
    </Invoice>
  </Invoices>
</fe:Facturae>`;

    return {
      xml,
      taxSubtotal,
      taxAmount,
      grandTotal,
      filename: `Facturae-3.2.2-${input.invoiceNumber || "INV"}.xml`,
    };
  }

  // PEPPOL BIS 3.0 or XRechnung 3.0 (UBL 2.1)
  const customizationId =
    input.standard === "XRECHNUNG_3"
      ? "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0"
      : "urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0";

  const ublLinesXml = normalizedLines
    .map(
      (line) => `  <cac:InvoiceLine>
    <cbc:ID>${line.id}</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">${line.quantity}</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="${escapeXml(input.currency)}">${line.lineTotal.toFixed(2)}</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>${escapeXml(line.description)}</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>${line.vatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="${escapeXml(input.currency)}">${line.unitPrice.toFixed(2)}</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>${customizationId}</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>${escapeXml(input.invoiceNumber)}</cbc:ID>
  <cbc:IssueDate>${escapeXml(input.issueDate)}</cbc:IssueDate>
  <cbc:DueDate>${escapeXml(input.dueDate)}</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>${escapeXml(input.currency)}</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>${escapeXml(input.buyerReference)}</cbc:BuyerReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>${escapeXml(input.sellerName)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${escapeXml(input.sellerAddress)}</cbc:StreetName>
        <cac:Country>
          <cbc:IdentificationCode>${escapeXml(input.sellerCountry || "DE")}</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXml(input.sellerVatId)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(input.sellerName)}</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>${escapeXml(input.buyerName)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${escapeXml(input.buyerAddress)}</cbc:StreetName>
        <cac:Country>
          <cbc:IdentificationCode>${escapeXml(input.buyerCountry || "DE")}</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXml(input.buyerVatId)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(input.buyerName)}</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>58</cbc:PaymentMeansCode>
    <cac:PayeeFinancialAccount>
      <cbc:ID>${escapeXml(input.iban)}</cbc:ID>
    </cac:PayeeFinancialAccount>
  </cac:PaymentMeans>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="${escapeXml(input.currency)}">${taxAmount.toFixed(2)}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="${escapeXml(input.currency)}">${taxSubtotal.toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="${escapeXml(input.currency)}">${taxAmount.toFixed(2)}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>${primaryVatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="${escapeXml(input.currency)}">${taxSubtotal.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="${escapeXml(input.currency)}">${taxSubtotal.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="${escapeXml(input.currency)}">${grandTotal.toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="${escapeXml(input.currency)}">${grandTotal.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
${ublLinesXml}
</Invoice>`;

  const prefix = input.standard === "XRECHNUNG_3" ? "XRechnung-3.0" : "PEPPOL-BIS-3.0";
  return {
    xml,
    taxSubtotal,
    taxAmount,
    grandTotal,
    filename: `${prefix}-${input.invoiceNumber || "INV"}.xml`,
  };
}
