"use client";

import { useDialog } from '../context/DialogContext';

interface ServicePageCTAProps {
    label: string;
    loanType: string;
    className?: string; // Allow passing styles
}

export default function ServicePageCTA({ label, loanType, className }: ServicePageCTAProps) {
    const { openDialog } = useDialog();

    return (
        <button
            onClick={() => openDialog({ loanType })}
            className={className || "bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg flex items-center gap-2"}
        >
            {label}
        </button>
    );
}
