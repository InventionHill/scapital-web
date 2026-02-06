"use client";

import { Send, Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LoanBanner, ContactInfo } from '../types';

interface SocialLinkData {
    id: string;
    platform: string;
    url: string;
    isActive: boolean;
}

export default function Footer() {
    const [products, setProducts] = useState<LoanBanner[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use localhost for local dev if env not set
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

                // Fetch Products
                const resProducts = await fetch(`${apiUrl}/loan-banner`);
                if (resProducts.ok) {
                    const data: LoanBanner[] = await resProducts.json();
                    setProducts(data.filter(s => s.isActive));
                }

                // Fetch Social Links
                const resSocial = await fetch(`${apiUrl}/social-links`);
                if (resSocial.ok) {
                    const data: SocialLinkData[] = await resSocial.json();
                    setSocialLinks(data.filter(l => l.isActive));
                }

                // Fetch Contact Info
                const resContact = await fetch(`${apiUrl}/contact-infos/active`);
                if (resContact.ok) {
                    const data: ContactInfo = await resContact.json();
                    setContactInfo(data);
                }

            } catch (error) {
                console.error("Failed to fetch footer data:", error);
            }
        };

        fetchData();
    }, []);

    const getIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p === 'facebook') return <Facebook size={20} />;
        if (p === 'twitter') return <Twitter size={20} />;
        if (p === 'linkedin') return <Linkedin size={20} />;
        if (p === 'instagram') return <Instagram size={20} />;
        return <Globe size={20} />;
    };

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

                        <div className="mt-6 flex flex-col gap-2">
                            {contactInfo && (
                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    <span className="block text-white font-semibold mb-1">Address:</span>
                                    {contactInfo.address}
                                </p>
                            )}
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
                                <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                                <li><Link href="/career" className="hover:text-teal-400 transition-colors">Careers</Link></li>
                                <li><Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
                                <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="font-bold text-sm text-white mb-6">Support</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/help-center" className="hover:text-teal-400 transition-colors">Help Center</Link></li>
                                <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        {socialLinks.length > 0 && (
                            <div>
                                <h3 className="font-bold text-sm text-white mb-6">Social</h3>
                                <ul className="space-y-4 text-sm text-gray-400">
                                    {socialLinks.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-teal-400 transition-colors flex items-center gap-2"
                                            >
                                                <span className="capitalize">{link.platform}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SCAPITAL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
