"use client";

import { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

export default function EmployeesTestimonialsSection() {
    const [testimonials, setTestimonials] = useState<any[]>([]);

    const [startIndex, setStartIndex] = useState(0);
    const [itemsVisible, setItemsVisible] = useState(3); // Default to desktop (3)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1'}/employee-testimonials`);
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();

                // Map API data to UI structure and sort
                const mappedData = data
                    .filter((t: any) => t.isActive)
                    // .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) // No order field yet
                    .map((t: any) => ({
                        name: t.name,
                        position: t.position,
                        image: t.imageUrl || "/avatar-1.png", // Fallback image
                        text: t.content,
                        rating: 5 // Default rating as backend doesn't have it
                    }));

                setTestimonials(mappedData);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsVisible(1);
            } else {
                setItemsVisible(3);
                // Ensure we don't show whitespace when switching to desktop
                if (testimonials.length > 0) {
                    setStartIndex(prev => Math.min(prev, Math.max(0, testimonials.length - 3)));
                }
            }
        };

        // Initialize on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [testimonials.length]);

    const handleNext = () => {
        if (startIndex < testimonials.length - itemsVisible) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const isStart = startIndex === 0;
    const isEnd = startIndex >= testimonials.length - itemsVisible;

    return (
        <div className="bg-white pt-14 md:pt-19 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-[#111827]  leading-tight">What Our Employees </h2>
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-teal-700 leading-tight">Say About Us</h2>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden mb-16 mx-[-1rem]">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(calc(-${startIndex} * 100%))`
                        } as React.CSSProperties}
                    >
                        {/* Desktop Override */}
                        <style jsx>{`
                            @media (min-width: 768px) {
                                .flex.transition-transform {
                                    transform: translateX(calc(-${startIndex} * 33.3333%)) !important;
                                }
                            }
                        `}</style>

                        {testimonials.map((t, i) => (
                            <div key={i} className="w-full md:w-1/3 flex-shrink-0 px-4">
                                <div className="bg-white p-10 rounded-[1.08rem] border border-teal-700 relative flex flex-col items-center text-center group h-full">

                                    {/* Accent Borders */}
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-teal-700 rounded-tr-[1rem]"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-teal-700 rounded-bl-[1rem]"></div>

                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mt-4">
                                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                    </div>

                                    <h3 className="text-2xl font-normal text-[#111827] mb-2">{t.name}</h3>
                                    <h2 className="text-xl font-normal text-[#111827] mb-4">{t.position}</h2>

                                    <p className="text-[#111827] text-base leading-relaxed mb-6 font-medium flex-grow">
                                        “{t.text}”
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={handlePrev}
                        disabled={isStart}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isStart
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-teal-700 text-white hover:bg-teal-800'
                            }`}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isEnd}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isEnd
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-teal-700 text-white hover:bg-teal-800'
                            }`}
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
