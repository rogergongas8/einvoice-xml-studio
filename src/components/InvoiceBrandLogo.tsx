import React from "react";

export function InvoiceBrandLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="XMLInvoice.studio Central Bank Ledger Emblem"
    >
      {/* Background rounded ledger plinth in Deep Central-Bank Pine */}
      <rect x="2" y="2" width="40" height="40" rx="10" fill="#1B3B2B" />
      <rect
        x="2.75"
        y="2.75"
        width="38.5"
        height="38.5"
        rx="9.25"
        stroke="#DFD9CE"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />

      {/* Crisp Ivory Invoice Sheet with folded upper-right corner */}
      <path
        d="M11 8.5C11 7.67157 11.6716 7 12.5 7H25.5L33 14.5V34.5C33 35.3284 32.3284 36 31.5 36H12.5C11.6716 36 11 35.3284 11 34.5V8.5Z"
        fill="#FDFBF7"
      />
      {/* Folded corner flap */}
      <path
        d="M25.5 7L33 14.5H27C26.1716 14.5 25.5 13.8284 25.5 13V7Z"
        fill="#DFD9CE"
      />

      {/* Geometric <XML/> angle brackets & slash engraved inside the ledger sheet */}
      <path
        d="M17.5 17.5L14.2 20.5L17.5 23.5"
        stroke="#1B3B2B"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 17.5L29.8 20.5L26.5 23.5"
        stroke="#1B3B2B"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 16.5L20.8 24.5"
        stroke="#B85D19"
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* Ledger rules at the bottom of the sheet */}
      <line
        x1="14.5"
        y1="28"
        x2="24"
        y2="28"
        stroke="#656058"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <line
        x1="14.5"
        y1="31.5"
        x2="21"
        y2="31.5"
        stroke="#1B3B2B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Official Burnished Copper Wax / Treasury Seal */}
      <circle cx="29.5" cy="31.5" r="5.5" fill="#B85D19" stroke="#FDFBF7" strokeWidth="1.5" />
      <path
        d="M27.6 31.5L28.9 32.8L31.6 30.1"
        stroke="#FDFBF7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
