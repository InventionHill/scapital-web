"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDialog } from '../context/DialogContext';

// Define the API data interface
interface CtaButton {
    label: string;
    url?: string;
    enabled: boolean;
}

interface FeatureItem {
    text: string;
    isActive: boolean;
}

interface LoanBanner {
    id: string;
    title: string;
    imageUrl: string;
    redirectUrl?: string; // Kept for backward compatibility or simplistic banners
    description?: string;
    features?: FeatureItem[];
    ctaPrimary?: CtaButton;
    ctaSecondary?: CtaButton;
    order: number;
    isActive: boolean;
    isDefault?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function LoanTabsSection() {
    const [banners, setBanners] = useState<LoanBanner[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { openDialog } = useDialog();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${API_URL}/loan-banner`);
                if (!response.ok) {
                    throw new Error('Failed to fetch loan banners');
                }
                const data: LoanBanner[] = await response.json();

                // Filter active banners and sort by order
                const activeBanners = data
                    .filter(banner => banner.isActive)
                    .sort((a, b) => a.order - b.order);

                setBanners(activeBanners);

                if (activeBanners.length > 0) {
                    // Find default tab or use first one
                    const defaultBanner = activeBanners.find(b => b.isDefault);
                    setActiveTabId(defaultBanner ? defaultBanner.id : activeBanners[0].id);
                }
            } catch (error) {
                console.error("Error fetching loan banners:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const activeData = banners.find(b => b.id === activeTabId) || banners[0];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 200;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="relative -mt-8 z-20 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white rounded-[0.6rem] p-12 shadow-[0_0_20px_0_rgba(0,0,0,0.1)] flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700"></div>
                </div>
            </div>
        );
    }

    if (!activeData) {
        return null; // Or some fallback UI
    }

    return (
        <div className="relative -mt-8 z-20 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white rounded-[0.6rem] p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
                {/* Tabs Header with Scroll Controls */}
                <div className="relative flex items-center border-gray-100 pb-4">
                    <button
                        onClick={() => scroll('left')}
                        className="md:hidden absolute left-0 z-10 p-1 bg-white shadow-md rounded-full text-gray-600"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 scrollbar-hide w-full px-8 md:p-1 pb-2 snap-x"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {banners.map((banner) => (
                            <button
                                key={banner.id}
                                onClick={() => setActiveTabId(banner.id)}
                                className={`flex-shrink-0 w-[200px] px-4 py-4 rounded-lg text-sm font-medium transition-all duration-300 border snap-center flex items-center justify-center text-center leading-tight ${activeTabId === banner.id
                                    ? 'bg-teal-700 text-white transform scale-102'
                                    : 'bg-white text-gray-500 border-gray-200'
                                    }`}
                            >
                                {banner.title}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="md:hidden absolute right-0 z-10 p-1 bg-white shadow-md rounded-full text-gray-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 md:p-1 gap-12 items-center bg-white rounded-[0.6rem]">
                    {/* Left Image */}
                    <div className="md:col-span-5">
                        <div className="relative rounded-2xl overflow-hidden h-[400px] w-full">
                            {/* Overlay gradient for text readability if needed, but strict design shows clean image */}
                            <div className="absolute inset-0 bg-teal-900/10 mix-blend-multiply z-10"></div>
                            {activeData.imageUrl ? (
                                <img
                                    src={activeData.imageUrl}
                                    alt={activeData.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:col-span-7">
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {activeData.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-10">
                            {activeData.features?.filter(f => f.isActive).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="bg-teal-600 rounded-full p-1">
                                        <CheckCircle className="text-white w-4 h-4" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-700 font-bold text-sm tracking-wide">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {activeData.ctaPrimary?.enabled && (
                                <button
                                    onClick={() => openDialog({ loanType: activeData.title })}
                                    className="bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-teal-800 transition-colors uppercase inline-block text-center min-w-[120px]"
                                >
                                    {activeData.ctaPrimary.label}
                                </button>
                            )}
                            {activeData.ctaSecondary?.enabled && (
                                <Link
                                    href={`/services/${activeData.id}`}
                                    className="border border-teal-600 text-teal-700 px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-teal-50 transition-colors uppercase inline-block text-center min-w-[120px]"
                                >
                                    {activeData.ctaSecondary.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* Slider Dots (Decorative) */}
                <div className="flex justify-center gap-2 mt-6 pb-2">
                    {banners.map((banner) => {
                        const isActive = activeTabId === banner.id;
                        return (
                            <div
                                key={banner.id}
                                className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-teal-700' : 'w-8 bg-gray-200'}`}
                            ></div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
