"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
    defaultOpen: boolean;
}


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch(`${API_URL}/faqs`);
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQs');
                }
                const data = await response.json();

                // Map API data and sort
                const filteredData = data
                    .filter((f: FAQ) => f.isActive)
                    .sort((a: FAQ, b: FAQ) => (a.order || 0) - (b.order || 0));

                setFaqs(filteredData);

                // Set default open indices
                const defaultOpenIndices = filteredData
                    .map((f: FAQ, index: number) => f.defaultOpen ? index : -1)
                    .filter((i: number) => i !== -1);

                setOpenIndices(defaultOpenIndices);

            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFAQ = (index: number) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter(i => i !== index));
        } else {
            setOpenIndices([...openIndices, index]);
        }
    };

    return (
        <div className="bg-white pt-12 md:pt-20 pb-10 md:pb-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-[#111827] leading-tight">Frequently Asked</h2>
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-teal-700 leading-tight">Questions</h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndices.includes(index);
                        return (
                            <div key={index} className="border-b border-teal-600/50 pb-6 last:border-none">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between text-left group"
                                >
                                    <span className={`font-bold transition-colors ${isOpen ? 'text-[#374151]' : 'text-[#4B5563]'}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-6 h-6 text-teal-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        strokeWidth={2.5}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-[#9CA3AF] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
