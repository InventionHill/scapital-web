import { LoanBanner } from '../../types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Home,
    Check,
    CheckCircle,
    Zap,
    XCircle,
    FileText,
    Wallet,
    User,
    Sparkles,
    CircleDollarSign
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

        if (!res.ok) return null;

        return res.json();
    } catch (error) {
        console.error("Failed to fetch service:", error);
        return null;
    }
}

import { AppIcon } from '../../components/AppIcon';
import { iconMap } from '../../lib/iconLibrary';

// Helper to map icon names or titles to Lucide icons
const getBenefitIcon = (iconName: string | undefined, title: string) => {
    const props = { size: 24, strokeWidth: 2 };

    // 1. Try to match from full library first
    if (iconName && iconMap[iconName]) {
        return <AppIcon name={iconName} {...props} />;
    }

    // 2. Explicit mapping for legacy or fallback icons
    if (iconName) {
        switch (iconName.toLowerCase()) {
            case 'zap': return <Zap {...props} />;
            case 'x-circle': return <XCircle {...props} />;
            case 'file-text': return <FileText {...props} />;
            case 'wallet': return <Wallet {...props} />;
            case 'user': return <User {...props} />;
            case 'sparkles': return <Sparkles {...props} />;
            case 'check-circle': return <CheckCircle {...props} />;
        }
    }

    // 3. Smart fallback based on title keywords
    const t = title.toLowerCase();
    if (t.includes('quick') || t.includes('fast')) return <Zap {...props} />;
    if (t.includes('collateral') || t.includes('security')) return <XCircle {...props} />;
    if (t.includes('document') || t.includes('paperwork')) return <FileText {...props} />;
    if (t.includes('emi') || t.includes('repayment') || t.includes('money')) return <Wallet {...props} />;
    if (t.includes('use') || t.includes('personal') || t.includes('purpose')) return <User {...props} />;
    if (t.includes('transparent') || t.includes('hidden') || t.includes('charge')) return <Sparkles {...props} />;
    if (t.includes('rate') || t.includes('interest')) return <CircleDollarSign {...props} />;

    return <CheckCircle {...props} />;
};

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

            {/* Overview Section */}
            {(service.overviewTitle || service.overviewTitleHighlight) && (
                <RevealOnScroll className="py-10 md:py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-8 font-sans tracking-tight leading-tight">
                            {service.overviewTitle}
                            {service.overviewTitleHighlight && (
                                <span className="block text-[#0d9488] mt-2">{service.overviewTitleHighlight}</span>
                            )}
                        </h2>
                        <div className="text-[17px] text-gray-600 leading-relaxed font-medium whitespace-pre-line text-left">
                            {service.overviewContent}
                        </div>
                    </div>
                </RevealOnScroll>
            )}

            {/* Benefits Section */}
            {(service.benefits && service.benefits.length > 0) || (service.features && service.features.length > 0) ? (
                <RevealOnScroll className="py-10 md:py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                                {service.benefitsTitle || `Why ${service.title} is the Ideal Choice`}
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-extrabold text-[#0d9488] mt-2 leading-tight tracking-tight">
                                {service.benefitsTitleHighlight || 'for Your Financial Needs'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Benefits Cards */}
                            {(service.benefits && service.benefits.length > 0
                                ? service.benefits
                                : service.features?.filter(f => f.isActive).map(f => ({
                                    title: f.text,
                                    description: 'Benefit description...',
                                    icon: 'check-circle'
                                }))
                            )?.map((benefit: any, idx: number) => (
                                <div key={idx} className="bg-white p-8 rounded-[20px] border border-[#2dd4bf] hover:shadow-lg transition-all duration-300 h-full flex flex-col items-start text-left">
                                    <div className="w-12 h-12 bg-[#0d9488] rounded-full flex items-center justify-center text-white mb-6 shadow-sm shrink-0">
                                        {getBenefitIcon(benefit.icon, benefit.title)}
                                    </div>
                                    <h3 className="text-[22px] font-bold text-[#1f2937] mb-3 leading-tight">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-[15px] leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            ) : null}

            {/* Documents Section */}
            {service.documents && service.documents.length > 0 && (
                <RevealOnScroll className="w-full bg-[#137a78] py-6 md:py-10 text-white mt-2">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <h2 className="text-2xl md:text-[34px] font-normal mb-8 leading-tight">
                            {service.documentsTitle || (
                                <>
                                    Documents Required for <span className="font-bold">{service.title}</span>
                                </>
                            )}
                        </h2>
                        <div className="max-w-5xl">
                            <ul className="grid gap-4">
                                {service.documents.map((doc, index) => {
                                    const isString = typeof doc === 'string';
                                    const title = isString ? doc : doc.title;
                                    const desc = isString ? '' : doc.description;

                                    return (
                                        <li key={index} className="flex items-start gap-4 text-[15px] md:text-[17px] leading-relaxed">
                                            <div className="w-2 h-2 bg-white rounded-full shrink-0 mt-2.5" />
                                            <div>
                                                <span className="font-bold">{title}</span>
                                                {desc && (
                                                    <span className="font-normal opacity-90"> - {desc}</span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>
            )}

            {/* Rates & Charges Section */}
            {(service.ratesTitle || service.ratesTitleHighlight) && (
                <RevealOnScroll className="py-10 md:py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid lg:grid-cols-[55%_45%] gap-5 items-center">
                            {/* Left: Content & Table */}
                            <div>
                                <h2 className="text-3xl md:text-[42px] font-extrabold text-[#1f2937] mb-8 leading-[1.2]">
                                    {service.ratesTitle || 'Transparent Interest'} <br />
                                    <span className="text-[#0d9488]">{service.ratesTitleHighlight || 'Rates & Charges'}</span>
                                </h2>

                                {service.ratesTable && service.ratesTable.length > 0 && (
                                    <div className="rounded-lg border border-[#137a78] overflow-hidden shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#137a78] text-white">
                                                    <th className="py-3 px-6 font-bold text-[17px] w-1/2 border-r border-white">Type of Charges</th>
                                                    <th className="py-3 px-6 font-bold text-[17px]">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-[16px] md:text-[17px] text-[#374151]">
                                                {service.ratesTable.map((rate, idx) => (
                                                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#158384]/30'} border-b border-[#137a78] last:border-b-0`}>
                                                        <td className="py-3 px-6 font-bold border-r border-[#137a78] align-top">
                                                            {rate.label}
                                                        </td>
                                                        <td className="py-3 px-6 align-top font-medium">{rate.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Right: Image */}
                            {service.ratesImage && (
                                <div className="flex justify-center lg:justify-end relative">
                                    <div className="relative z-10">
                                        <img
                                            src={service.ratesImage}
                                            alt="Rates and Charges"
                                            className="w-full max-w-[500px] h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </RevealOnScroll>
            )}



            {/* Steps / Process Section */}
            {(service.steps && service.steps.length > 0) && (
                <RevealOnScroll className="py-6 md:py-8 bg-white relative">
                    <div className="max-w-4xl mx-auto px-6 md:px-8">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-[42px] font-extrabold text-[#1f2937] leading-[1.2] tracking-tight">
                                {service.stepsTitle || `Get a ${service.title} in`} <br />
                                <span className="text-[#0d9488]">{service.stepsTitleHighlight || '3 Simple Steps'}</span>
                            </h2>
                        </div>

                        {/* Steps Vertical Timeline */}
                        <div className="space-y-0 relative">
                            {service.steps.map((step, idx, arr) => {
                                const isLast = idx === arr.length - 1;
                                return (
                                    <div key={idx} className={`flex gap-6 md:gap-8 relative ${!isLast ? 'pb-12' : ''}`}>
                                        {/* Left Column: Bucket + Line */}
                                        <div className="flex flex-col items-center shrink-0 w-[60px]">
                                            {/* Number Bubble */}
                                            <div className="w-[60px] h-[60px] rounded-full bg-[#137a78] flex items-center justify-center border-4 border-white shadow-md  relative z-10 shrink-0">
                                                <span className="text-2xl font-bold text-white">{idx + 1}</span>
                                            </div>

                                            {/* Connecting Line */}
                                            {!isLast && (
                                                <div className="absolute top-[60px] bottom-0 w-[2px] border-l-[2px] border-dotted border-[#0d9488]/40 left-[30px] -translate-x-1/2 -z-0" />
                                            )}
                                        </div>

                                        {/* Right Column: Content */}
                                        <div className="pt-2 pb-2">
                                            <h3 className="text-xl md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Button CTA */}
                        {service.ctaPrimary?.enabled && (
                            <div className="mt-8 text-center">
                                <ServicePageCTA
                                    label={service.stepsButtonLabel || `Apply for ${service.title}`}
                                    loanType={service.title}
                                    className="inline-block bg-[#137a78] hover:bg-[#0f605e] text-white px-16 py-3 rounded-lg font-bold text-[16px] shadow-lg hover:shadow-xl transition-all"
                                />
                            </div>
                        )}
                    </div>
                </RevealOnScroll>
            )}

            {/* Comparison Section */}
            {(service.comparisonTable && service.comparisonTable.length > 0) && (
                <RevealOnScroll className="pt-12 md:pt-14 pb-2 md:pb-2 bg-white">
                    <div className="max-w-6xl mx-auto px-6 md:px-8">
                        {/* Title */}
                        <div className="text-center max-w-4xl mx-auto mb-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                                {service.comparisonTitle || 'SCAPITAL Vs. Other Lenders'}
                                {service.comparisonTitleHighlight && (
                                    <span className="text-[#0d9488] ml-2">{service.comparisonTitleHighlight}</span>
                                )}
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="overflow-hidden rounded-lg border border-[#137a78]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse">
                                    <thead>
                                        <tr className="bg-[#137a78] text-white">
                                            <th className="py-5 px-6 text-left text-[18px] font-bold w-[25%] border-r border-white">Feature</th>
                                            <th className="py-5 px-6 text-left text-[18px] font-bold w-[25%] border-r border-white">SCAPITAL</th>
                                            <th className="py-5 px-6 text-left text-[18px] font-bold w-[25%] border-r border-white">Traditional Banks</th>
                                            <th className="py-5 px-6 text-left text-[18px] font-bold w-[25%]">Other NBFCs</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[16px] md:text-[17px] text-[#374151]">
                                        {service.comparisonTable.map((row, idx) => (
                                            <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#158384]/30'} border-b border-[#137a78] last:border-b-0`}>
                                                <td className="py-4 px-6 font-bold border-r border-[#137a78] align-middle">
                                                    {row.feature}
                                                </td>
                                                <td className="py-4 px-6 font-bold border-r border-[#137a78] align-middle text-[#1f2937]">
                                                    {row.scapital}
                                                </td>
                                                <td className="py-4 px-6 font-medium border-r border-[#137a78] align-middle">
                                                    {row.banks}
                                                </td>
                                                <td className="py-4 px-6 font-medium align-middle">
                                                    {row.nbfcs}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            )}
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
