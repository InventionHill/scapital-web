import { LoanBanner } from '../../types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Home,
    Check
} from 'lucide-react';
import { notFound } from 'next/navigation';
import ServiceCalculator from '../../components/ServiceCalculator';
import RevealOnScroll from '@/app/components/RevealOnScroll';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import FAQSection from '@/app/components/FAQSection';
import ServicePageCTA from '../../components/ServicePageCTA';

async function getService(id: string): Promise<LoanBanner | null> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';
        const res = await fetch(`${apiUrl}/loan-banner/${id}`, { cache: 'no-store' });

        if (!res.ok) {
            console.error(`Fetch failed with status: ${res.status}`);
            return null;
        }

        const text = await res.text();
        if (!text) {
            console.error("Fetch returned empty body");
            return null;
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch service:", error);
        return null;
    }
}

import ServiceSections from '../../components/ServiceSections';

// Helper removed as it is now in ServiceSections

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service || !service.isActive) {
        notFound();
    }

    const headingText = service.heading || service.title;
    const highlightText = service.headingHighlight;

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />



            {/* Hero Section */}
            <div className="bg-white pb-6 md:pb-10 mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-6">
                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                                <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                                    Home
                                </Link>
                                <ChevronRight size={14} />
                                <span className="hover:text-teal-600 cursor-pointer">Service</span>
                                <ChevronRight size={14} />
                                <span className="text-teal-600">{service.title}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] leading-[1.15] tracking-tight">
                                {headingText}
                                {highlightText && (
                                    <> <span className="text-[#0d9488]">{highlightText}</span></>
                                )}
                            </h1>

                            <p className="text-gray-600 text-[17px] leading-relaxed max-w-xl font-medium">
                                {service.description}
                            </p>

                            {/* Hero Features / Checks */}
                            {service.features && service.features.length > 0 && (
                                <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-6">
                                    {service.features.filter(f => f.isActive).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="shrink-0">
                                                <div className="w-5 h-5 rounded-full bg-[#0F766E] flex items-center justify-center shadow-sm">
                                                    <Check size={12} className="text-white" strokeWidth={3} />
                                                </div>
                                            </div>
                                            <span className="text-[15px] font-bold text-gray-600 tracking-normal">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="pt-8">
                                <div className="flex flex-wrap gap-4">
                                    {service.ctaPrimary?.enabled && (
                                        <ServicePageCTA
                                            label={service.ctaPrimary.label}
                                            loanType={service.title} // Pass the service title as loan type
                                        />
                                    )}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Right Content: Calculator */}
                        <RevealOnScroll className="relative w-full" delay={200}>
                            <ServiceCalculator
                                serviceTitle={service.title}
                                defaultAmount={service.defaultAmount}
                                minAmount={service.minAmount}
                                maxAmount={service.maxAmount}
                                defaultTenure={service.defaultTenure}
                                minTenure={service.minTenure}
                                maxTenure={service.maxTenure}
                                defaultInterest={service.defaultInterest}
                                minInterest={service.minInterest}
                                maxInterest={service.maxInterest}
                            />
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Dynamic Service Sections */}
            <ServiceSections service={service} />
            <RevealOnScroll delay={100}>
                <TestimonialsSection />
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <FAQSection />
            </RevealOnScroll>

            <Footer />
        </main>
    );
}
