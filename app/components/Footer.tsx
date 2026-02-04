"use client";

import { Send } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LoanBanner } from '../types';

export default function Footer() {
    const [products, setProducts] = useState<LoanBanner[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use localhost for local dev if env not set
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';
                const res = await fetch(`${apiUrl}/loan-banner`);
                if (res.ok) {
                    const data: LoanBanner[] = await res.json();
                    setProducts(data.filter(s => s.isActive));
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <footer className="bg-[#0F172A] text-white pt-10 md:pt-12 pb-4 md:pb-4 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mb-16">
                    {/* Left Section - Brand */}
                    <div className="lg:max-w-sm space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/Footer_logo.svg" alt="SCAPITAL Logo" height={36} width={190} />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            The global standard for digital-first capital deployment.
                            Engineered for speed, built for security.
                        </p>

                        <div className="relative mt-4 max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#1e293b] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 pr-12 text-sm placeholder:text-gray-400"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-400 p-2">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                        {/* Products */}
                        <div>
                            <h3 className="font-bold text-sm text-white mb-6">Products</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <li key={product.id}>
                                            <Link href={`/services/${product.id}`} className="hover:text-teal-400 transition-colors">
                                                {product.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>Loading...</li>
                                )}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="font-bold text-sm text-white mb-6">Company</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                                <li><Link href="/career" className="hover:text-teal-400 transition-colors">Careers</Link></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="font-bold text-sm text-white mb-6">Support</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">FAQs</a></li>
                                <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="font-bold text-sm text-white mb-6">Social</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; 2024 SCAPITAL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
