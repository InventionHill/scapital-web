"use client";

import { ChevronRight, Clock, Mail, MapPin, Phone, RefreshCw, Volume2, X, Check, User, Home, Briefcase, Building, Car, Bike, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PartnersSection from '../components/PartnersSection';
import RevealOnScroll from '../components/RevealOnScroll';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Forms from '../components/Forms';
import { getContactInfo, ContactInfo } from '../lib/api';
import { AppIcon } from '../components/AppIcon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function ContactPage() {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    // Application Form State
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        loanType: '',
        loanAmount: '',
        tenure: '',
        captcha: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loanTypes, setLoanTypes] = useState<{ title: string; icon?: string }[]>([]);
    const [captchaCode, setCaptchaCode] = useState('');
    const [isLoanTypeOpen, setIsLoanTypeOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLoanTypeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getServiceIcon = (title: string, iconName?: string) => {
        if (iconName) {
            return <AppIcon name={iconName} size={18} />;
        }
        const t = title.toLowerCase();
        if (t.includes("personal")) return <User size={18} />;
        if (t.includes("home")) return <Home size={18} />;
        if (t.includes("business")) return <Briefcase size={18} />;
        if (t.includes("property")) return <Building size={18} />;
        if (t.includes("car")) return <Car size={18} />;
        if (t.includes("two") || t.includes("bike")) return <Bike size={18} />;
        return <ChevronDown size={18} />;
    };

    useEffect(() => {
        async function fetchContact() {
            try {
                const data = await getContactInfo();
                setContactInfo(data);
            } catch (error) {
                console.error("Error fetching contact info:", error);
            }
        }
        fetchContact();
        fetchLoanTypes();
        generateCaptcha();
    }, []);

    const fetchLoanTypes = async () => {
        try {
            const response = await fetch(`${API_URL}/loan-banner`);
            if (response.ok) {
                const data = await response.json();
                const activeTypes = data
                    .filter((item: any) => item.isActive)
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((item: any) => ({ title: item.title, icon: item.icon }));
                setLoanTypes(activeTypes);
            }
        } catch (error) {
            console.error("Failed to fetch loan types:", error);
        }
    };

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numberRegex = /^\d+$/;

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";

        if (!formData.mobileNumber) {
            newErrors.mobileNumber = "Mobile Number is required";
        } else if (!phoneRegex.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
        }

        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.loanType) newErrors.loanType = "Please select a loan type";

        if (!formData.loanAmount) {
            newErrors.loanAmount = "Loan Amount is required";
        }

        if (!formData.tenure) {
            newErrors.tenure = "Tenure is required";
        }

        if (!formData.captcha) {
            newErrors.captcha = "Please enter the security code";
        } else if (formData.captcha.toUpperCase() !== captchaCode) {
            newErrors.captcha = "Incorrect security code";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles].slice(0, 5));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            let documentUrls: string[] = [];

            if (files.length > 0) {
                const uploadFormData = new FormData();
                files.forEach(file => {
                    uploadFormData.append('file', file);
                });

                const uploadResponse = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    body: uploadFormData,
                });

                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    if (data.urls) {
                        documentUrls = data.urls;
                    }
                } else {
                    console.error("Upload failed");
                }
            }

            const payload = {
                fullName: formData.fullName.trim(),
                email: formData.email,
                phone: formData.mobileNumber,
                loanType: formData.loanType,
                loanAmount: formData.loanAmount,
                tenure: formData.tenure,
                documents: documentUrls
            };

            const response = await fetch(`${API_URL}/loan-applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    fullName: '',
                    mobileNumber: '',
                    email: '',
                    loanType: '',
                    loanAmount: '',
                    tenure: '',
                    captcha: '',
                });
                setFiles([]);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[400px] w-full relative bg-gray-50">
                                {contactInfo?.mapUrl ? (
                                    <iframe
                                        src={contactInfo.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full object-cover"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">Map location unavailable</p>
                                        </div>
                                    </div>
                                )}
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
                                        <p className="text-gray-600 font-medium">{contactInfo ? contactInfo.phone : '+91 XXXXX XXXXX'}</p>
                                    </div>
                                </div>

                                {/* Email Support */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Email Support</h3>
                                        <p className="text-gray-600 font-medium">{contactInfo ? contactInfo.email : 'support@scapital.com'}</p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Working Hours</h3>
                                        <p className="text-gray-600 font-medium">{contactInfo ? contactInfo.workingHours : 'Mon–Sat: 9:30 AM – 6:30 PM'}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-full bg-[#158384] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1f2937] mb-1">Address</h3>
                                        <p className="text-gray-600 font-medium">{contactInfo ? contactInfo.address : '+91 XXXXX XXXXX'}</p>
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

                            {/* Success Message */}
                            {submitStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                                    <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                                        <Check className="w-10 h-10 text-teal-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                                    <p className="text-gray-300 max-w-md">We have received your details and will contact you shortly.</p>
                                    <button
                                        onClick={() => {
                                            setSubmitStatus('idle');
                                            generateCaptcha();
                                        }}
                                        className="mt-8 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                                    >
                                        Submit another application
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    {/* Basic Personal Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-white text-lg font-semibold">Basic Personal Details</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Full name"
                                                    className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.fullName ? 'border-2 border-red-500' : ''}`}
                                                />
                                                {errors.fullName && <p className="text-red-400 text-xs mt-1 ml-2">{errors.fullName}</p>}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="tel"
                                                        id="mobileNumber"
                                                        value={formData.mobileNumber}
                                                        onChange={handleChange}
                                                        placeholder="Mobile number"
                                                        className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.mobileNumber ? 'border-2 border-red-500' : ''}`}
                                                    />
                                                    {errors.mobileNumber && <p className="text-red-400 text-xs mt-1 ml-2">{errors.mobileNumber}</p>}
                                                </div>
                                                <div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Email address ( Optional )"
                                                        className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.email ? 'border-2 border-red-500' : ''}`}
                                                    />
                                                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-2">{errors.email}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Loan Requirement Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-white text-lg font-semibold">Loan Requirement Details</h3>
                                        <div className="space-y-4">
                                            <div className="relative" ref={dropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLoanTypeOpen(!isLoanTypeOpen)}
                                                    className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base flex items-center justify-between transition-all text-left ${errors.loanType ? 'border-2 border-red-500' : ''}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {formData.loanType ? (
                                                            <>
                                                                <span className="text-teal-600">
                                                                    {getServiceIcon(formData.loanType, loanTypes.find(t => t.title === formData.loanType)?.icon)}
                                                                </span>
                                                                <span className="text-gray-900 font-medium">{formData.loanType}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-500">Select Loan Type</span>
                                                        )}
                                                    </div>
                                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isLoanTypeOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {errors.loanType && <p className="text-red-400 text-xs mt-1 ml-2">{errors.loanType}</p>}

                                                {isLoanTypeOpen && (
                                                    <div className="absolute top-full left-0 w-full z-50 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
                                                        <div className="p-1">
                                                            {loanTypes.map((type, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData(prev => ({ ...prev, loanType: type.title }));
                                                                        setIsLoanTypeOpen(false);
                                                                    }}
                                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                                                                        ${formData.loanType === type.title ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50 text-gray-700'}
                                                                    `}
                                                                >
                                                                    <div className={`${formData.loanType === type.title ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-600'}`}>
                                                                        {getServiceIcon(type.title, type.icon)}
                                                                    </div>
                                                                    <span className="font-medium">{type.title}</span>
                                                                    {formData.loanType === type.title && (
                                                                        <Check size={16} className="ml-auto text-teal-600" />
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="loanAmount"
                                                        value={formData.loanAmount}
                                                        onChange={handleChange}
                                                        placeholder="Required loan amount"
                                                        className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.loanAmount ? 'border-2 border-red-500' : ''}`}
                                                    />
                                                    {errors.loanAmount && <p className="text-red-400 text-xs mt-1 ml-2">{errors.loanAmount}</p>}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="tenure"
                                                        value={formData.tenure}
                                                        onChange={handleChange}
                                                        placeholder="Preferred tenure (months)"
                                                        className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.tenure ? 'border-2 border-red-500' : ''}`}
                                                    />
                                                    {errors.tenure && <p className="text-red-400 text-xs mt-1 ml-2">{errors.tenure}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Upload */}
                                    <div className="space-y-4">
                                        <h3 className="text-white text-lg font-semibold">Document Upload <span className="text-gray-400 text-sm font-normal">( Optional )</span></h3>
                                        <div className="relative">
                                            <div
                                                className="w-full bg-white text-gray-500 px-4 py-3 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <span className="text-sm md:text-base truncate max-w-[70%]">
                                                    {files.length > 0
                                                        ? `${files.length} file(s) selected`
                                                        : "Select your Aadhaar card and PAN card"}
                                                </span>
                                                <span className="text-xs md:text-sm text-gray-400 whitespace-nowrap">( Upload Document )</span>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    multiple
                                                />
                                            </div>

                                            {files.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {files.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-white/10 p-3 rounded-lg border border-white/10">
                                                            <span className="text-sm font-medium text-gray-300 truncate max-w-[80%]">{file.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="text-gray-400 hover:text-red-400 p-1"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Captcha */}
                                    <div className="space-y-4">
                                        <h3 className="text-white text-lg font-semibold">Captcha</h3>
                                        <div className="flex gap-4">
                                            <div className="bg-white w-48 h-12 rounded-md flex items-center justify-center select-none">
                                                <span className="font-mono text-xl tracking-[0.2em] text-gray-600 font-bold line-through decoration-gray-400/50">{captchaCode}</span>
                                            </div>
                                            <div className="flex flex-col justify-between h-12">
                                                <RefreshCw
                                                    className="text-white hover:text-teal-400 cursor-pointer w-5 h-5 transition-colors"
                                                    onClick={generateCaptcha}
                                                />
                                                <Volume2 className="text-white hover:text-teal-400 cursor-pointer w-5 h-5 transition-colors" />
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                id="captcha"
                                                value={formData.captcha}
                                                onChange={handleChange}
                                                placeholder="Please type the code above"
                                                className={`w-full bg-white text-gray-900 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base placeholder:text-gray-500 ${errors.captcha ? 'border-2 border-red-500' : ''}`}
                                            />
                                            {errors.captcha && <p className="text-red-400 text-xs mt-1 ml-2">{errors.captcha}</p>}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#158384] hover:bg-teal-700 text-white font-bold py-3 px-12 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto md:min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2 justify-center">
                                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </span>
                                            ) : 'Apply Now'}
                                        </button>
                                    </div>

                                    {submitStatus === 'error' && (
                                        <p className="text-red-400 text-center font-medium">Failed to submit application. Please try again.</p>
                                    )}
                                </form>
                            )}
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
