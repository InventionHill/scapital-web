"use client";

import { BadgeCheck, ChevronRight, Lock, Shield, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RevealOnScroll from '../components/RevealOnScroll';
import { KeyDepartment } from '../types';
import WhyChooseSection from '../components/WhyChooseSection';
import PartnersSection from '../components/PartnersSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';

export default function CareerPage() {
    const [departments, setDepartments] = useState<KeyDepartment[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                // Use localhost for local dev if env not set
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';
                const res = await fetch(`${apiUrl}/key-departments`);
                if (res.ok) {
                    const data: KeyDepartment[] = await res.json();
                    setDepartments(data.filter(d => d.isActive));
                }
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white pt-8 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="hover:text-teal-600 cursor-pointer">Company</span>
                        <ChevronRight size={14} />
                        <span className="text-teal-600">About Us</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white pb-8 md:pb-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-4">
                            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#1f2937] leading-[1.1] tracking-tight">
                                About SCAPITALYour Trusted Financial <br />
                                <span className="text-[#0d9488]">Loan Partner</span>
                            </h1>

                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl font-medium">
                                SCAPITAL is your trusted financial loan partner, delivering fast and transparent loan solutions for every need. With quick approvals, minimal documentation, and expert guidance, we make the borrowing process smooth and dependable. Our focus is on simple, customer-first financing you can rely on.
                            </p>

                            {/* <div className="pt-2">
                                <button className="bg-[#137a78] hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    View Open Position
                                </button>
                            </div> */}
                        </RevealOnScroll>

                        {/* Right Content - Image */}
                        <RevealOnScroll className="relative" delay={200}>
                            <div className="relative z-10">
                                {/* Using Career_image.png as requested */}
                                <img
                                    src="/About.svg"
                                    alt="Career Growth"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Who We Are Section */}
            <div className="bg-white pb-4 md:pb-6 pt-2 md:pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-[#1f2937]">
                            Who <span className="text-[#0d9488]">We Are</span>
                        </h2>

                        <div className="space-y-4 text-justify text-gray-600 text-[15px] leading-relaxed font-medium">
                            <p>
                                We are a customer-focused financial services platform dedicated to helping individuals and businesses access the right loan products with speed and transparency. Our goal is to make the borrowing process simple, secure, and hassle-free for every customer.
                            </p>
                            <p>
                                We use a streamlined digital process to reduce delays and improve approval speed. Our team provides proper guidance at every step, from application to final disbursal. We carefully understand each customer's needs before suggesting loan options.
                            </p>
                            <p>
                                We work closely with multiple banks and NBFC partners to offer competitive and flexible loan solutions. This multi-partner approach helps customers get better choices and higher approval chances. We are committed to delivering trustworthy, clear, and customer-friendly financial support.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 max-w-2xl">

                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <span className="font-bold text-[#1f2937]">Customer-first approach</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <span className="font-bold text-[#1f2937]">Transparent process</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <span className="font-bold text-[#1f2937]">Multi-bank partnerships</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <span className="font-bold text-[#1f2937]">Fast approvals</span>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="bg-gray-50 py-8 md:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <RevealOnScroll>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-3">
                            Our Mission
                        </h2>
                        <p className="text-justify text-gray-600 text-[15px] leading-relaxed font-medium">
                            Our mission is to make loan access simple, fast, and transparent for everyone through smart technology and expert guidance. We strive to remove confusion and complexity from the borrowing process. Our platform is designed to deliver quick and responsible financial support with clear terms and honest communication. We focus on creating a smooth, customer-friendly loan journey from start to finish. Our commitment is to help customers make confident and informed financial decisions.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-3">
                            Our Vision
                        </h2>
                        <p className="text-justify text-gray-600 text-[15px] leading-relaxed font-medium">
                            Our vision is to become a trusted and leading digital loan facilitation platform across India. We aim to deliver fast, secure, and customer-friendly financial solutions through a technology-driven approach. We focus on building long-term trust by maintaining transparency and reliability in every process. Our goal is to make quality loan services easily accessible to individuals and businesses everywhere. We strive to continuously improve our systems to provide a better and smarter borrowing experience.
                        </p>
                    </RevealOnScroll>
                </div>
            </div>

            <RevealOnScroll>
                <WhyChooseSection />
            </RevealOnScroll>

            {/* Trust & Security Section */}
            <div className="bg-white pt-12 md:pt-14 pb-4 md:pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-[#1f2937]">
                            Our Commitment to <span className="text-[#0d9488]">Trust & Security</span>
                        </h2>

                        <p className="text-justify text-gray-600 text-[15px] leading-relaxed font-medium mb-12">
                            We follow strict data protection standards to keep your personal and financial information fully secure. Our platform uses advanced security and verification systems at every stage of the process. Each loan application is handled through verified and compliant channels only. We are committed to maintaining privacy, safety, and trust in every customer interaction.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="border border-[#158384]/40 rounded-2xl px-4 py-3 flex items-center gap-6 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="text-white w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-[#1f2937]">Data Encrypted</span>
                            </div>

                            {/* Card 2 */}
                            <div className="border border-[#158384]/40 rounded-2xl px-4 py-3 flex items-center gap-6 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0">
                                    <Lock className="text-white w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-[#1f2937]">Secure Systems</span>
                            </div>

                            {/* Card 3 */}
                            <div className="border border-[#158384]/40 rounded-2xl px-4 py-3 flex items-center gap-6 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0">
                                    <BadgeCheck className="text-white w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-[#1f2937]">Verified Partners</span>
                            </div>

                            {/* Card 4 */}
                            <div className="border border-[#158384]/40 rounded-2xl px-4 py-3 flex items-center gap-6 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0">
                                    <Shield className="text-white w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-[#1f2937]">Privacy Protected</span>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <RevealOnScroll>
                <PartnersSection />
            </RevealOnScroll>

            <RevealOnScroll>
                <StatsSection />
            </RevealOnScroll>

            <RevealOnScroll>
                <TestimonialsSection />
            </RevealOnScroll>

            <RevealOnScroll>
                <FAQSection />
            </RevealOnScroll>

            <Footer />
        </main>
    );
}
