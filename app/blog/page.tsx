"use client";

import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Forms from '../components/Forms';
import Navbar from '../components/Navbar';
import RevealOnScroll from '../components/RevealOnScroll';

export default function ContactPage() {

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white pt-8 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="hover:text-teal-600 cursor-pointer">Company</span>
                        <ChevronRight size={14} />
                        <span className="text-teal-600">Contact Us</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white pb-8 md:pb-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-4">
                            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#1f2937] leading-[1.1] tracking-tight">
                                Get in Touch With Our Loan Experts for Fast, Reliable
                                <br />
                                <span className="text-[#0d9488]">Guidance and Support</span>
                            </h1>

                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl font-medium">
                                Get in touch with our loan experts for fast and reliable financial guidance tailored to your needs. Our team helps you understand the best loan options, eligibility, and documentation with complete transparency. Connect with us for quick support and a smooth, hassle-free loan process.
                            </p>

                            <div className="pt-2">
                                <button className="bg-[#137a78] hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    View Open Position
                                </button>
                            </div>
                        </RevealOnScroll>

                        {/* Right Content - Image */}
                        <RevealOnScroll className="relative" delay={200}>
                            <div className="relative z-10">
                                {/* Using Career_image.png as requested */}
                                <img
                                    src="/Blog.svg"
                                    alt="Career Growth"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>


            {/* Blog Section */}
            <div className="bg-white pt-12 md:pt-15 pb-2 md:pb-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <RevealOnScroll delay={100}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937]">Browse by category</h2>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search a category"
                                    className="w-full bg-white border border-[#0d9488] rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-[#0d9488] text-sm placeholder:text-gray-400 caret-gray-400"
                                />
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Subheader */}
                    <RevealOnScroll className="mb-8">
                        <h3 className="text-2xl font-bold text-[#0d9488]">Recent Blog</h3>
                    </RevealOnScroll>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog 1 */}
                        <RevealOnScroll delay={100}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog1.svg" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 2 */}
                        <RevealOnScroll delay={200}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog2.svg" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 3 */}
                        <RevealOnScroll delay={300}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog3.svg" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Popular Blog Subheader */}
                    <RevealOnScroll className="mb-8 mt-16">
                        <h3 className="text-2xl font-bold text-[#0d9488]">Popular Blog</h3>
                    </RevealOnScroll>

                    {/* Popular Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog 1 */}
                        <RevealOnScroll delay={100}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog1.svg" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 2 */}
                        <RevealOnScroll delay={200}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog2.svg" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 3 */}
                        <RevealOnScroll delay={300}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog3.svg" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 4 (Repeat of 1) */}
                        <RevealOnScroll delay={100}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog1.svg" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 5 (Repeat of 2) */}
                        <RevealOnScroll delay={200}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog2.svg" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 6 (Repeat of 3) */}
                        <RevealOnScroll delay={300}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog3.svg" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Previously Blog Subheader */}
                    <RevealOnScroll className="mb-8 mt-16">
                        <h3 className="text-2xl font-bold text-[#0d9488]">Previously Blog</h3>
                    </RevealOnScroll>

                    {/* Previously Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog 1 */}
                        <RevealOnScroll delay={100}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog1.svg" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 2 */}
                        <RevealOnScroll delay={200}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog2.svg" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 3 */}
                        <RevealOnScroll delay={300}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog3.svg" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 4 (Repeat of 1) */}
                        <RevealOnScroll delay={100}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog1.svg" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 5 (Repeat of 2) */}
                        <RevealOnScroll delay={200}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog2.svg" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Blog 6 (Repeat of 3) */}
                        <RevealOnScroll delay={300}>
                            <div className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full">
                                    <img src="/Blog3.svg" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-sm text-gray-500 font-medium">18 Nov 2025</span>
                                    <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                                        How to Get a Personal Loan Approved Faster
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        Learn the key factors lenders check before approving a personal loan. Discover simple steps to improve your approval chances and avoid common mistakes.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            <RevealOnScroll delay={100}>
                <FAQSection />
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <Forms />
            </RevealOnScroll>

            <Footer />
        </main>
    );
}
