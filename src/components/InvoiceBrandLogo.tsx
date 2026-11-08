import React from "react";

export function InvoiceBrandLogo({
  size = "md",
  showText = true,
}: {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}) {
  const iconSize =
    size === "sm" ? "w-7 h-7" : size === "lg" ? "w-10 h-10" : "w-8 h-8";

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className={`${iconSize} rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-xs shrink-0 p-1.5 text-white`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-base font-bold tracking-tight text-neutral-900">
            XML<span className="text-indigo-600">Invoice</span>
          </span>
          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80">
            STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
