"use client";

import React, { useState, useEffect } from 'react';
import { Check, Phone, Mail, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

const Forms = () => {
    const [contactInfo, setContactInfo] = useState({
        phone: '+1 (800) S-CAPITAL',
        email: 'hello@scapital.com'
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/section-content/contact_info`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.extraConfig) {
                        const config = typeof data.extraConfig === 'string'
                            ? JSON.parse(data.extraConfig)
                            : data.extraConfig;

                        setContactInfo({
                            phone: config.phone || '+1 (800) S-CAPITAL',
                            email: config.email || 'hello@scapital.com'
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching contact info:", error);
            }
        };

        fetchContactInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch(`${API_URL}/loan-applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ firstName: '', lastName: '', email: '' });
                // Reset success message after 3 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
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
        <section className="bg-[#117D77] py-8 md:py-10 font-sans text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Column: Text & Contact Info */}
                <div className="space-y-5">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                            Ready to Secure Your<br />Financial Future?
                        </h2>
                        <p className="leading-relaxed max-w-xl">
                            Apply in less than 5 minutes and get instant approval with zero paperwork hassle.
                            Our team is ready to guide you at every step.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            "No hidden charges",
                            "Personal loan manager",
                            "Disbursal within 24h"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-[#117D77]" strokeWidth={4} />
                                </div>
                                <span className="leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-50/20 p-3 rounded-xl backdrop-blur-sm">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm">Call us directly</p>
                                <p className="font-normal text-lg">{contactInfo.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-teal-50/20 p-3 rounded-xl backdrop-blur-sm">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm">Email support</p>
                                <p className="font-normal text-lg">{contactInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Application Form */}
                <div className="bg-white rounded-[2rem] p-2 md:p-6 shadow-xl max-w-lg mx-auto lg:mx-0 lg:ml-auto w-full text-gray-900">
                    <h3 className="text-xl font-bold text-center mb-6">Start Your Application</h3>

                    {submitStatus === 'success' ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="font-semibold">Application Submitted!</p>
                            <p className="text-sm mt-1">We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="firstName" className="sr-only">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all placeholder:text-gray-500 font-medium bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="sr-only">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all placeholder:text-gray-500 font-medium bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all placeholder:text-gray-500 font-medium bg-gray-50/50"
                                />
                            </div>

                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-sm text-center">
                                    Something went wrong. Please try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#0F172A] hover:bg-gray-800 text-white font-semibold py-3 rounded-full transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isSubmitting ? 'Submitting...' : 'Apply Now'}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </section>
    )
}

export default Forms