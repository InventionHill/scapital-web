'use client';

import React from 'react';
import {
    LoanBanner,
    PageContentSection,
    OverviewSection,
    BenefitsSection,
    DocumentsSection,
    ComparisonSection,
    RatesSection,
    StepsSection
} from '../types';
import RevealOnScroll from './RevealOnScroll';
import { AppIcon } from './AppIcon';
import { iconMap } from '../lib/iconLibrary';
import {
    Zap, XCircle, FileText, Wallet, User, Sparkles, CheckCircle, CircleDollarSign
} from 'lucide-react';
import ServicePageCTA from './ServicePageCTA';

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

const RenderOverview = ({ section }: { section: OverviewSection }) => {
    return (
        <RevealOnScroll className="py-10 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-8 font-sans tracking-tight leading-tight">
                    {section.title}
                    {(section.highlight || section.titleHighlight) && (
                        <span className="block text-[#0d9488] mt-2">{section.highlight || section.titleHighlight}</span>
                    )}
                </h2>
                <div className="text-[17px] text-gray-600 leading-relaxed font-medium whitespace-pre-line text-left">
                    {section.content}
                </div>
            </div>
        </RevealOnScroll>
    );
};

const RenderBenefits = ({ section }: { section: BenefitsSection }) => {
    return (
        <RevealOnScroll className="py-10 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                        {section.title}
                    </h2>
                    {(section.highlight || section.titleHighlight) && (
                        <h3 className="text-3xl md:text-5xl font-extrabold text-[#0d9488] mt-2 leading-tight tracking-tight">
                            {section.highlight || section.titleHighlight}
                        </h3>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((benefit, idx) => (
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
    );
};

const RenderDocuments = ({ section }: { section: DocumentsSection }) => {
    return (
        <RevealOnScroll className="w-full bg-[#137a78] py-6 md:py-10 text-white mt-2">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h2 className="text-2xl md:text-[34px] font-normal mb-8 leading-tight">
                    {section.title}
                </h2>
                <div className="max-w-5xl">
                    <ul className="grid gap-4">
                        {section.items.map((doc, index) => (
                            <li key={index} className="flex items-start gap-4 text-[15px] md:text-[17px] leading-relaxed">
                                <div className="w-2 h-2 bg-white rounded-full shrink-0 mt-2.5" />
                                <div>
                                    <span className="font-bold">{doc.title}</span>
                                    {doc.description && (
                                        <span className="font-normal opacity-90"> - {doc.description}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </RevealOnScroll>
    );
};

const RenderRates = ({ section }: { section: RatesSection }) => {
    return (
        <RevealOnScroll className="py-10 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-[55%_45%] gap-5 items-center">
                    {/* Left: Content & Table */}
                    <div>
                        <h2 className="text-3xl md:text-[42px] font-extrabold text-[#1f2937] mb-8 leading-[1.2]">
                            {section.title} <br />
                            {(section.highlight || section.titleHighlight) && <span className="text-[#0d9488]">{section.highlight || section.titleHighlight}</span>}
                        </h2>

                        {(section.charges || section.items) && (section.charges || section.items).length > 0 && (
                            <div className="rounded-lg border border-[#137a78] overflow-hidden shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#137a78] text-white">
                                            <th className="py-3 px-6 font-bold text-[17px] w-1/2 border-r border-white">Type of Charges</th>
                                            <th className="py-3 px-6 font-bold text-[17px]">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[16px] md:text-[17px] text-[#374151]">
                                        {(section.charges || section.items || []).map((rate, idx) => (
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
                    {(section.imageUrl || section.image) && (
                        <div className="flex justify-center lg:justify-end relative">
                            <div className="relative z-10">
                                <img
                                    src={section.imageUrl || section.image}
                                    alt="Rates and Charges"
                                    className="w-full max-w-[500px] h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </RevealOnScroll>
    );
};

const RenderSteps = ({ section, serviceTitle, ctaEnabled }: { section: StepsSection, serviceTitle: string, ctaEnabled?: boolean }) => {
    return (
        <RevealOnScroll className="py-6 md:py-8 bg-white relative">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-[42px] font-extrabold text-[#1f2937] leading-[1.2] tracking-tight">
                        {section.title} <br />
                        {(section.highlight || section.titleHighlight) && <span className="text-[#0d9488]">{section.highlight || section.titleHighlight}</span>}
                    </h2>
                </div>

                {/* Steps Vertical Timeline */}
                <div className="space-y-0 relative">
                    {section.items.map((step, idx, arr) => {
                        const isLast = idx === arr.length - 1;
                        return (
                            <div key={idx} className={`flex gap-6 md:gap-8 relative ${!isLast ? 'pb-12' : ''}`}>
                                {/* Left Column: Bucket + Line */}
                                <div className="flex flex-col items-center shrink-0 w-[60px]">
                                    {/* Number Bubble */}
                                    <div className="w-[60px] h-[60px] rounded-full bg-[#137a78] flex items-center justify-center border-4 border-white shadow-md relative z-10 shrink-0">
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
                {(ctaEnabled || section.buttonLabel) && (
                    <div className="mt-8 text-center">
                        <ServicePageCTA
                            label={section.buttonLabel || `Apply for ${serviceTitle}`}
                            loanType={serviceTitle}
                            className="inline-block bg-[#137a78] hover:bg-[#0f605e] text-white px-16 py-3 rounded-lg font-bold text-[16px] shadow-lg hover:shadow-xl transition-all"
                        />
                    </div>
                )}
            </div>
        </RevealOnScroll>
    );
};

const RenderComparison = ({ section }: { section: ComparisonSection }) => {
    return (
        <RevealOnScroll className="pt-12 md:pt-14 pb-2 md:pb-2 bg-white">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                {/* Title */}
                <div className="text-center max-w-4xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                        {section.title}
                        {(section.highlight || section.titleHighlight) && (
                            <span className="text-[#0d9488] ml-2">{section.highlight || section.titleHighlight}</span>
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
                                {(section.table || section.items || []).map((row, idx) => (
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
    );
};

const mapLegacyToSections = (service: LoanBanner): PageContentSection[] => {
    const sections: PageContentSection[] = [];

    // 1. Overview
    if (service.overviewTitle || service.overviewTitleHighlight) {
        sections.push({
            id: 'legacy-overview', type: 'overview', isActive: true,
            title: service.overviewTitle || '',
            highlight: service.overviewTitleHighlight,
            content: service.overviewContent || ''
        });
    }

    // 2. Benefits
    if ((service.benefits && service.benefits.length > 0) || (service.features && service.features.length > 0)) {
        let items = service.benefits || [];
        if (!items.length && service.features) {
            items = service.features.filter(f => f.isActive).map(f => ({
                title: f.text,
                description: 'Benefit description...',
                icon: 'check-circle'
            }));
        }
        sections.push({
            id: 'legacy-benefits', type: 'benefits', isActive: true,
            title: service.benefitsTitle || `Why ${service.title} is the Ideal Choice`,
            highlight: service.benefitsTitleHighlight || 'for Your Financial Needs',
            items: items
        });
    }

    // 3. Documents
    if (service.documents && service.documents.length > 0) {
        // Handle both string[] and DocumentItem[]
        const docs = service.documents.map(d => typeof d === 'string' ? { title: d, description: '' } : d);
        sections.push({
            id: 'legacy-documents', type: 'documents', isActive: true,
            title: service.documentsTitle || `Documents Required for ${service.title}`,
            items: docs
        });
    }

    // 4. Rates
    if (service.ratesTitle || service.ratesTitleHighlight) {
        sections.push({
            id: 'legacy-rates', type: 'rates', isActive: true,
            title: service.ratesTitle || 'Transparent Interest',
            highlight: service.ratesTitleHighlight || 'Rates & Charges',
            imageUrl: service.ratesImage,
            charges: service.ratesTable || []
        });
    }

    // 5. Steps
    if (service.steps && service.steps.length > 0) {
        sections.push({
            id: 'legacy-steps', type: 'steps', isActive: true,
            title: service.stepsTitle || `Get a ${service.title} in`,
            highlight: service.stepsTitleHighlight || '3 Simple Steps',
            buttonLabel: service.stepsButtonLabel,
            items: service.steps
        });
    }

    // 6. Comparison
    if (service.comparisonTable && service.comparisonTable.length > 0) {
        sections.push({
            id: 'legacy-comparison', type: 'comparison', isActive: true,
            title: service.comparisonTitle || 'SCAPITAL Vs. Other Lenders',
            highlight: service.comparisonTitleHighlight,
            table: service.comparisonTable
        });
    }

    return sections;
};

export default function ServiceSections({ service }: { service: LoanBanner }) {
    // If pageContent exists and isn't empty, use it. Otherwise fallback to mapped legacy fields.
    const sections = (service.pageContent && service.pageContent.length > 0)
        ? service.pageContent
        : mapLegacyToSections(service);

    return (
        <>
            {sections.map((section, idx) => {
                // Ensure visibility check if property exists (it should on PageContentSection)
                if (section.isActive === false) return null;

                switch (section.type) {
                    case 'overview':
                        return <RenderOverview key={section.id || idx} section={section as OverviewSection} />;
                    case 'benefits':
                        return <RenderBenefits key={section.id || idx} section={section as BenefitsSection} />;
                    case 'documents':
                        return <RenderDocuments key={section.id || idx} section={section as DocumentsSection} />;
                    case 'rates':
                        return <RenderRates key={section.id || idx} section={section as RatesSection} />;
                    case 'steps':
                        return <RenderSteps
                            key={section.id || idx}
                            section={section as StepsSection}
                            serviceTitle={service.title}
                            ctaEnabled={service.ctaPrimary?.enabled}
                        />;
                    case 'comparison':
                        return <RenderComparison key={section.id || idx} section={section as ComparisonSection} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}
