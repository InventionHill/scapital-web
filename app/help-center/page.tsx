"use client";

import { BadgeCheck, ChevronRight, Clock, CreditCard, FileText, Headphones, Mail, MapPin, Percent, Phone, Scan, Search, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Forms from '../components/Forms';
import Navbar from '../components/Navbar';
import RevealOnScroll from '../components/RevealOnScroll';

export default function HelpCenterPage() {

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="hover:text-teal-600 cursor-pointer">Company</span>
                        <ChevronRight size={14} />
                        <span className="text-teal-600">Help Center</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white pb-14 md:pb-18 overflow-hidden">
                <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-6">
                            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#1f2937] leading-[1.2] tracking-tight">
                                How can we help you today with your loan questions and
                                <br className="hidden lg:block" />
                                <span className="text-[#0d9488]"> support needs?</span>
                            </h1>

                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl font-medium">
                                Get quick answers and expert guidance for all your loan questions in one place. Explore helpful resources, step-by-step guides, and support topics designed to make your loan journey simple and stress-free. Our team is here to help you at every stage from application to approval.
                            </p>

                            <div className="pt-2">
                                <div className="relative w-full max-w-xs">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH HELP TOPIC"
                                        className="w-full bg-white border border-gray-300 hover:border-gray-400 rounded-full py-3 pl-14 pr-6 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm tracking-wide text-gray-700 placeholder:text-gray-400 shadow-sm transition-all"
                                    />
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Right Content - Image */}
                        <RevealOnScroll className="relative" delay={200}>
                            <div className="relative z-10">
                                <img
                                    src="/Help.svg"
                                    alt="Help Center Support"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Quick Help Section */}
            <div className="bg-white pb-12 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll delay={100} className="mb-12 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1f2937]">
                            Quick <span className="text-[#0d9488]">Help</span>
                        </h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 1. Loan Application Help */}
                        <RevealOnScroll delay={100}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Headphones className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Loan Application Help</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Get step-by-step guidance on how to apply for a loan through our simple online process. Learn how to fill the form and avoid common application mistakes.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 2. Eligibility & Approval */}
                        <RevealOnScroll delay={150}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BadgeCheck className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Eligibility & Approval</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Understand the key eligibility criteria lenders check before approval. Discover how to improve your profile and increase your chances of getting approved.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 3. Documents Required */}
                        <RevealOnScroll delay={200}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileText className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Documents Required</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    View the complete checklist of KYC and income documents needed for faster processing. Prepare your documents in advance to avoid delays.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 4. EMI & Repayment */}
                        <RevealOnScroll delay={250}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <CreditCard className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">EMI & Repayment</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Learn how EMI works, how it is calculated, and how to choose the right tenure. Get clarity on repayment options and smart EMI planning.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 5. Interest Rates & Charges */}
                        <RevealOnScroll delay={300}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Percent className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Interest Rates & Charges</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Understand how interest rates are decided and what fees may apply. We explain all charges clearly so you can borrow with full transparency.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 6. Account & Profile Help */}
                        <RevealOnScroll delay={350}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <User className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Account & Profile Help</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Manage your profile details and application information easily. Get help with updates, corrections, and account-related support.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 7. Disbursal & Status Tracking */}
                        <RevealOnScroll delay={400}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Scan className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Disbursal & Status Tracking</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Track your loan application and disbursal progress in real time. Know each stage from approval to funds credited to your bank account.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* 8. Safety & Fraud Awareness */}
                        <RevealOnScroll delay={450}>
                            <div className="border border-[#158384]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full group bg-white">
                                <div className="w-12 h-12 rounded-full bg-[#158384] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1f2937] mb-3">Safety & Fraud Awareness</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    Learn how to stay safe from loan fraud and fake offers. Follow verified communication practices to protect your money and personal data.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            {/* Contact Strip Section */}
            <div className="bg-[#1f2937] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

                        {/* 1. Call Us */}
                        <RevealOnScroll delay={100} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                <Phone className="text-[#0d9488] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                +91 98XXX XXXXX
                            </p>
                        </RevealOnScroll>

                        {/* 2. Email Support */}
                        <RevealOnScroll delay={200} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                <Mail className="text-[#0d9488] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                SUPPORT@SCAPITAL.COM
                            </p>
                        </RevealOnScroll>

                        {/* 3. Working Hours */}
                        <RevealOnScroll delay={300} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                <Clock className="text-[#0d9488] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
                            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                MON-SAT: 9:30 AM - 6:30 PM
                            </p>
                        </RevealOnScroll>

                        {/* 4. Address */}
                        <RevealOnScroll delay={400} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                <MapPin className="text-[#0d9488] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Address</h3>
                            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                AHMEDABAD
                            </p>
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
