'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function TermsOfService() {
    const [content, setContent] = useState<{ heading?: string; description?: string; updatedAt?: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${API_URL}/section-content/terms_of_service`);
                if (response.ok) {
                    const text = await response.text();
                    const data = text ? JSON.parse(text) : null;

                    if (data && data.isActive) {
                        setContent(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching terms:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                </div>
                <Footer />
            </>
        );
    }

    if (!content) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-4 py-20">
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md mx-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Content Unavailable</h2>
                        <p className="text-gray-500">The Terms of Service are currently not available. Please try again later.</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#0F172A] text-white pt-20 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/10 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/10 blur-[80px] rounded-full transform -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold tracking-wider uppercase mb-4 border border-teal-500/30">
                        Legal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        {content.heading || 'Terms of Service'}
                    </h1>
                    {content.updatedAt && (
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 text-teal-500" />
                            <span>Last updated: {new Date(content.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <main className="flex-grow -mt-12 px-4 sm:px-6 lg:px-8 pb-20 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="prose prose-lg max-w-none text-gray-700
                                prose-headings:font-bold prose-headings:text-gray-900 
                                prose-p:text-gray-700 prose-p:leading-relaxed
                                prose-a:text-teal-600 prose-a:no-underline hover:prose-a:text-teal-700
                                prose-strong:text-gray-900 prose-strong:font-semibold
                                prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700
                                prose-hr:border-gray-200 prose-hr:my-8
                                prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700">
                                <ReactMarkdown>{content.description || ''}</ReactMarkdown>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                            <p>Have questions about our terms?</p>
                            <a href="/contact" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                                Contact Legal Support &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
