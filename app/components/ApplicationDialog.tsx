"use client";

// ... imports
import React, { useState, useRef, useEffect } from 'react';
import { X, RotateCw, Check, ChevronDown, User, Home, Briefcase, Building, Car, Bike } from 'lucide-react';
import { useDialog } from '../context/DialogContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AppIcon } from './AppIcon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function ApplicationDialog() {
    const { isOpen, closeDialog, dialogData } = useDialog();
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        loanType: '',
        loanAmount: '',
        tenure: '',
        captcha: '',
    });

    useEffect(() => {
        if (isOpen && dialogData) {
            setFormData(prev => ({
                ...prev,
                loanType: dialogData.loanType || prev.loanType,
                loanAmount: dialogData.loanAmount || prev.loanAmount,
                tenure: dialogData.tenure || prev.tenure
            }));
        }
    }, [isOpen, dialogData]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [loanTypes, setLoanTypes] = useState<{ title: string; icon?: string }[]>([]);
    const [isLoanTypeOpen, setIsLoanTypeOpen] = useState(false);

    useEffect(() => {
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

        fetchLoanTypes();
    }, []);

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

    // Captcha State
    const [captchaCode, setCaptchaCode] = useState('');

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
    };

    useEffect(() => {
        if (isOpen) {
            generateCaptcha();
            setFormData(prev => ({ ...prev, captcha: '' }));
            setErrors({});
            setSubmitStatus('idle');
            setFiles([]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

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
        } else if (!numberRegex.test(formData.loanAmount.replace(/,/g, ''))) { // Allow commas for user friendliness but strict check effectively
            // Simple number check for now, can be enhanced
            if (isNaN(Number(formData.loanAmount.replace(/,/g, '')))) {
                newErrors.loanAmount = "Enter a valid amount";
            }
        }

        if (!formData.tenure) {
            newErrors.tenure = "Tenure is required";
        } else if (!numberRegex.test(formData.tenure)) {
            newErrors.tenure = "Enter a valid tenure in months";
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
        // Clear error when user types
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
                setTimeout(() => {
                    setSubmitStatus('idle');
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
                    closeDialog();
                }, 3000);
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
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeDialog();
                }
            }}
        >
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">

                {/* Header */}
                <div className="flex-none bg-white z-10 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-center flex-1 ml-8 text-gray-900">Start Your Application</h2>
                    <button
                        onClick={closeDialog}
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {submitStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500">We have received your details and will contact you shortly.</p>
                            <Button variant="secondary" onClick={closeDialog} className="mt-8">
                                Close
                            </Button>
                        </div>
                    ) : (
                        <form id="application-form" onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">Basic Personal Details</h3>
                                <div className="space-y-4">
                                    <Input
                                        id="fullName"
                                        label="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                        error={errors.fullName}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            type="tel"
                                            id="mobileNumber"
                                            label="Mobile Number"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                            required
                                            error={errors.mobileNumber}
                                        />
                                        <Input
                                            type="email"
                                            id="email"
                                            label="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email (Optional)"
                                            error={errors.email}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Loan Requirement Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">Loan Details</h3>
                                <div className="space-y-4">
                                    {/* Custom Dropdown for Loan Type */}
                                    <div className="space-y-2 relative" ref={dropdownRef}>
                                        <label htmlFor="loanType" className="block text-sm font-medium text-gray-700">
                                            Loan Type <span className="text-red-500">*</span>
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => setIsLoanTypeOpen(!isLoanTypeOpen)}
                                            className={`w-full flex items-center justify-between h-12 px-4 rounded-xl border bg-white transition-all
                                                ${errors.loanType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-teal-600'}
                                                ${isLoanTypeOpen ? 'ring-2 ring-teal-600 border-transparent' : ''}
                                            `}
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
                                                    <span className="text-gray-400">Select loan type</span>
                                                )}
                                            </div>
                                            <ChevronDown size={16} className={`text-gray-500 transition-transform ${isLoanTypeOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {errors.loanType && <p className="text-xs text-red-500">{errors.loanType}</p>}

                                        {/* Dropdown Menu */}
                                        {isLoanTypeOpen && (
                                            <div className="absolute top-full left-0 w-full z-50 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
                                                <div className="p-1">
                                                    {loanTypes.map((type, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, loanType: type.title }));
                                                                if (errors.loanType) setErrors(prev => ({ ...prev, loanType: '' }));
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
                                                    {loanTypes.length === 0 && (
                                                        <div className="px-4 py-3 text-sm text-gray-400 text-center">Loading options...</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            type="text"
                                            id="loanAmount"
                                            label="Loan Amount"
                                            value={formData.loanAmount}
                                            onChange={handleChange}
                                            placeholder="e.g. 5,00,000"
                                            required
                                            error={errors.loanAmount}
                                        />
                                        <Input
                                            type="text"
                                            id="tenure"
                                            label="Tenure (Years)"
                                            value={formData.tenure}
                                            onChange={handleChange}
                                            placeholder="e.g. 24"
                                            required
                                            error={errors.tenure}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Documents <span className="text-gray-400 font-normal text-sm">(Optional)</span>
                                </h3>
                                <div>
                                    <div
                                        className="border border-gray-300 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:border-teal-700 transition-colors bg-white group mb-3"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <span className="font-medium text-gray-400">
                                            Select Documents (PDF, Images)
                                        </span>
                                        <span className="text-gray-500 text-sm whitespace-nowrap group-hover:text-teal-700 transition-colors font-medium">
                                            ( Upload )
                                        </span>
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
                                        <div className="space-y-2">
                                            {files.map((f, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="text-sm font-medium text-gray-700 truncate max-w-[80%]">{f.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="text-gray-400 hover:text-red-500 p-1"
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
                                <h3 className="text-lg font-bold text-gray-900">Security Check</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Code</label>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 rounded-xl flex-1 h-12 flex items-center justify-center select-none border border-gray-200">
                                                <span className="font-mono text-xl tracking-[0.2em] text-gray-600 font-bold line-through decoration-gray-400/50">{captchaCode}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    type="button"
                                                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Reload"
                                                    onClick={generateCaptcha}
                                                >
                                                    <RotateCw size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Input
                                        id="captcha"
                                        label="Enter Code"
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        placeholder="Type the code"
                                        required
                                        error={errors.captcha}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer - Sticky at bottom */}
                {submitStatus !== 'success' && (
                    <div className="flex-none bg-white p-6 border-t border-gray-100 z-10">
                        <Button
                            form="application-form"
                            type="submit"
                            variant="primary" // Changed to primary (teal)
                            fullWidth
                            size="xl"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            className="bg-black hover:bg-gray-800 text-white" // Keep black/dark style override if desired, or rely on variant. User used dark previously.
                        >
                            {isSubmitting ? 'Submitting...' : 'Apply Now'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}


