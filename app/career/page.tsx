"use client";

import { BarChart2, ChevronRight, CircleDollarSign, Lightbulb, Scale, TrendingUp, Trophy, Users, Wrench, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EmployeesTestimonialsSection from '../components/EmployeesTestimonialsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Forms from '../components/Forms';
import Navbar from '../components/Navbar';
import RevealOnScroll from '../components/RevealOnScroll';
import { KeyDepartment } from '../types';

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
            <div className="bg-white pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="hover:text-teal-600 cursor-pointer">Company</span>
                        <ChevronRight size={14} />
                        <span className="text-teal-600">Career</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white pb-16 md:pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-4">
                            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#1f2937] leading-[1.1] tracking-tight">
                                Build Your Career With Us and Unlock Real <br />
                                <span className="text-[#0d9488]">Growth Opportunities</span>
                            </h1>

                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl font-medium">
                                Join our fast-growing fintech company and be part of a team that is transforming how people access and manage financial services. Work on smart, secure, and user-focused solutions that make finance faster and more accessible. Grow your career while making a real impact in the future of digital finance.
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
                                    src="/Career_image.png"
                                    alt="Career Growth"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="pt-0 pb-16 md:pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="text-center max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                            Discover the Benefits of Working <br className="hidden md:block" />
                            <span className="text-[#0d9488]">With Our Team</span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-10" delay={200}>
                        {/* Card 1 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <Zap size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                Fast-Expanding Digital Finance Platform
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Work in a rapidly expanding loan and fintech environment where your contributions create real market impact and drive smarter financial solutions.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <Wrench size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                Real Impact Through Financial Work
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Help build smarter, faster, and more accessible loan solutions that empower both customers and businesses to grow with confidence.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <TrendingUp size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                Real Growth Opportunities for Your Career Path
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Get continuous learning opportunities, build in-demand skills, and grow through clearly defined career advancement paths.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <Lightbulb size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                A Culture Powered by Innovation and Ideas
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Be part of a forward-thinking team that values technology, automation, and modern financial systems to drive smarter services.
                            </p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <Users size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                A Friendly, Supportive, Growth-Focused Team
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Collaborate with experienced professionals in a transparent, growth-focused culture that supports learning and shared success.
                            </p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-white px-6 pb-8 pt-12 rounded-[20px] border border-[#158384] relative flex flex-col items-center text-center">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center text-white shadow-sm">
                                <Trophy size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-3 leading-tight max-w-[90%] mx-auto">
                                Where Performance Earns Real Rewards
                            </h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Enjoy recognition, performance-based incentives, and meaningful rewards that reflect your contributions and results.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Why Top Talent Section */}
            <div className="pt-0 pb-16 md:pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="text-center max-w-4xl mx-auto mb-8">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                            Why Top Talent Chooses <br />
                            <span className="text-[#0d9488]">to Join Us</span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll className="max-w-7xl mx-auto space-y-6" delay={200}>
                        {/* Item 1: Competitive Salary */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <CircleDollarSign size={50} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Competitive Salary</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    We offer competitive salary packages aligned with industry standards, your skills, and your performance. Grow your income while working on impactful financial and lending solutions.
                                </p>
                            </div>
                        </div>

                        {/* Item 2: Performance Incentives */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <BarChart2 size={50} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Performance Incentives</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    Earn attractive performance incentives based on your results, productivity, and impact on business growth. We reward measurable achievements, not just effort.
                                </p>
                            </div>
                        </div>

                        {/* Item 3: Career Growth Path */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <TrendingUp size={50} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Career Growth Path</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    We provide a clear and structured career growth path with regular learning, role upgrades, and leadership opportunities. Grow faster as you build expertise in financial and lending services.
                                </p>
                            </div>
                        </div>

                        {/* Item 4: Training & Skill Development */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <div className="relative">
                                    <Lightbulb size={50} className="text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Training & Skill Development</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    Get continuous training and skill development programs designed around modern loan processing, fintech tools, and customer service excellence. We help you stay industry-ready.
                                </p>
                            </div>
                        </div>

                        {/* Item 5: Supportive Team Culture */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <Users size={50} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Supportive Team Culture</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    Work in a supportive team culture that encourages collaboration, knowledge sharing, and mutual growth. We believe strong teams build stronger financial solutions.
                                </p>
                            </div>
                        </div>

                        {/* Item 6: Work-Life Balance */}
                        <div className="flex flex-col md:flex-row bg-white rounded-[20px] border border-[#158384] overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="w-full md:w-[120px] bg-[#137a78] flex items-center justify-center py-8 md:py-0 shrink-0">
                                <Scale size={50} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div className="p-4 md:px-6 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1f2937] mb-1">Work-Life Balance</h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                    We promote a healthy work-life balance with flexible workflows and realistic targets, so you can stay productive without burnout. Perform better while maintaining personal well-being.
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Key Departments Section */}
            <div className="pt-0 pb-2 md:pb-2 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="text-center max-w-4xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
                            Explore the Key Departments <br />
                            <span className="text-[#0d9488]">We’re Hiring For</span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll className="max-w-7xl mx-auto space-y-5" delay={200}>
                        {departments.length > 0 ? (
                            departments.map((dept) => (
                                <div key={dept.id} className="flex flex-col md:flex-row items-center justify-between border border-[#158384] rounded-[20px] px-4 py-3 hover:shadow-md transition-shadow bg-white gap-4">
                                    <div className="text-center md:text-left">
                                        <span className="text-[16px] md:text-[18px] font-bold text-[#1f2937]">{dept.title}</span>
                                        <span className="text-gray-500 font-medium ml-2 text-[15px] block md:inline md:mt-0 mt-1">( {dept.experience} )</span>
                                    </div>
                                    <button className="bg-[#137a78] hover:bg-teal-700 text-white text-[12px] font-bold px-6 py-2 rounded-[10px] uppercase tracking-wider transition-colors shrink-0">
                                        APPLY NOW
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                Loading open positions...
                            </div>
                        )}
                    </RevealOnScroll>
                </div>
            </div>

            <RevealOnScroll delay={100}>
                <EmployeesTestimonialsSection />
            </RevealOnScroll>

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
