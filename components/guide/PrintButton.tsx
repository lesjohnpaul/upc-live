'use client';

/** Triggers the browser print dialog — "Save as PDF" lives there too. */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-forest-700 px-5 py-2.5 font-sans text-sm font-bold text-cream-50 transition-colors hover:bg-forest-600 print:hidden"
    >
      Print / Save as PDF
    </button>
  );
}
