"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Check, Upload, FileText, Trash2 } from 'lucide-react';
import { useDialog } from '../context/DialogContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function JobApplicationDialog() {
    const { isJobDialogOpen, closeJobDialog, jobDialogData } = useDialog();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: '',
    });

    useEffect(() => {
        if (isJobDialogOpen && jobDialogData) {
            setFormData(prev => ({
                ...prev,
                position: jobDialogData.position || prev.position
            }));
        }
    }, [isJobDialogOpen, jobDialogData]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isJobDialogOpen) {
            setFormData(prev => ({ ...prev, fullName: '', email: '', phone: '' }));
            setFile(null);
            setErrors({});
            setSubmitStatus('idle');
        }
    }, [isJobDialogOpen]);

    if (!isJobDialogOpen) return null;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit number";
        }
        if (!file) {
            newErrors.file = "Resume is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            if (errors.file) setErrors(prev => ({ ...prev, file: '' }));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            let resumeUrl = '';

            if (file) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);

                const uploadResponse = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    body: uploadFormData,
                });

                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    if (data.urls && data.urls.length > 0) {
                        resumeUrl = data.urls[0];
                    }
                } else {
                    console.error("Upload failed");
                    // Optionally handle upload error
                }
            }

            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                resumeUrl: resumeUrl
            };

            const response = await fetch(`${API_URL}/job-applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    closeJobDialog();
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
                if (e.target === e.currentTarget) closeJobDialog();
            }}
        >
            <div className="bg-white rounded-3xl w-full max-w-lg flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex-none bg-white z-10 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Apply for {formData.position || 'Position'}</h2>
                    <button onClick={closeJobDialog} className="text-gray-400 hover:text-gray-900 transition-colors p-1">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {submitStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500">Good luck! We will review your application shortly.</p>
                        </div>
                    ) : (
                        <form id="job-app-form" onSubmit={handleSubmit} className="space-y-6">
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
                                <Input
                                    type="email"
                                    id="email"
                                    label="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    error={errors.email}
                                />
                                <Input
                                    type="tel"
                                    id="phone"
                                    label="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                    error={errors.phone}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Resume / CV <span className="text-red-500">*</span></label>
                                {!file ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'}`}
                                    >
                                        <Upload className={`w-8 h-8 mb-2 ${errors.file ? 'text-red-400' : 'text-gray-400'}`} />
                                        <span className={`text-sm font-medium ${errors.file ? 'text-red-500' : 'text-gray-500'}`}>
                                            {errors.file || "Click to upload PDF or Word doc"}
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between bg-teal-50 border border-teal-100 p-3 rounded-lg">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="bg-white p-2 rounded-md shadow-sm">
                                                <FileText className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <span className="text-sm font-medium text-teal-900 truncate">{file.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="text-teal-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                </div>

                {submitStatus !== 'success' && (
                    <div className="bg-gray-50 p-6 border-t border-gray-100">
                        <Button
                            form="job-app-form"
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
