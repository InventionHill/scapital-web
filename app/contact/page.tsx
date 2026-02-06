"use client";

import { ChevronRight, Clock, Mail, MapPin, Phone, RefreshCw, Volume2, X } from 'lucide-react';
import Link from 'next/link';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PartnersSection from '../components/PartnersSection';
import RevealOnScroll from '../components/RevealOnScroll';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Forms from '../components/Forms';

export default function ContactPage() {

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
                        <span className="text-teal-600">Contact Us</span>
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
                                    src="/Contact.svg"
                                    alt="Career Growth"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content - Map Image */}
                        <RevealOnScroll>
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[400px] w-full relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.532955227531!2d72.53837811089532!3d23.114186879022558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e832045f78279%3A0xb8ea393f6d956dbf!2sInventionHill!5e0!3m2!1sen!2sin!4v1770295354321!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full object-cover"
                                ></iframe>
                            </div>
                        </RevealOnScroll>

                        {/* Right Content - Contact Details */}
                        <RevealOnScroll delay={200}>
                            <div className="space-y-8">
                                {/* Call Us */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Call Us</h3>
                                        <p className="text-gray-600 font-medium">+91 XXXXX XXXXX</p>
                                    </div>
                                </div>

                                {/* Email Support */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Email Support</h3>
                                        <p className="text-gray-600 font-medium">support@scapital.com</p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Working Hours</h3>
                                        <p className="text-gray-600 font-medium">Mon–Sat: 9:30 AM – 6:30 PM</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Address</h3>
                                        <p className="text-gray-600 font-medium">+91 XXXXX XXXXX</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>

            {/* Application Form Section */}
            <div className="bg-white pt-12 pb-5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="bg-[#1e293b] rounded-2xl p-6 md:p-8 relative">
                            {/* Close Icon (Visual only as requested) */}
                            <div className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer transition-colors">
                                <X size={24} />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Start Your Application</h2>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                {/* Basic Personal Details */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-lg font-semibold">Basic Personal Details</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Mobile number"
                                                className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email address ( Optional )"
                                                className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Requirement Details */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-lg font-semibold">Loan Requirement Details</h3>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <select defaultValue="" className="w-full bg-white text-gray-500 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base appearance-none cursor-pointer">
                                                <option value="" disabled>Loan type</option>
                                                <option value="personal">Personal Loan</option>
                                                <option value="home">Home Loan</option>
                                                <option value="business">Business Loan</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronRight className="rotate-90 text-gray-400" size={16} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Required loan amount"
                                                className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Preferred tenure (months)"
                                                className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Document Upload */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-lg font-semibold">Document Upload <span className="text-gray-400 text-sm font-normal">( Optional )</span></h3>
                                    <div className="relative">
                                        <div className="w-full bg-white text-gray-500 px-4 py-3 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="text-sm md:text-base">Select your Aadhaar card and PAN card</span>
                                            <span className="text-xs md:text-sm text-gray-400">( Upload Document )</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Captcha */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-lg font-semibold">Captcha</h3>
                                    <div className="flex gap-4">
                                        <div className="bg-white w-48 h-12 rounded-md"></div>
                                        <div className="flex flex-col justify-between h-12">
                                            <RefreshCw className="text-white hover:text-teal-400 cursor-pointer w-5 h-5" />
                                            <Volume2 className="text-white hover:text-teal-400 cursor-pointer w-5 h-5" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please the type code above"
                                        className="w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 flex justify-center">
                                    <button type="submit" className="bg-[#158384] hover:bg-teal-700 text-white font-bold py-3 px-12 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto md:min-w-[200px]">
                                        Apply Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <RevealOnScroll delay={100}>
                <PartnersSection />
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <StatsSection />
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <TestimonialsSection />
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
