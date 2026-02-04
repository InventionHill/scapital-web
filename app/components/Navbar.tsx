"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, User, Home, Briefcase, Building, Car, Bike, Percent, CreditCard, Truck, Info, Target, FileText, Phone, Headset, Shield, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoanBanner } from '../types';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [services, setServices] = useState<LoanBanner[]>([]);
    const pathname = usePathname();
    const [servicesTimeoutId, setServicesTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [companyTimeoutId, setCompanyTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [supportTimeoutId, setSupportTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const companyLinks = [
        { title: 'About Us', href: '/about', icon: <Info size={18} /> },
        { title: 'Career', href: '/career', icon: <Target size={18} /> },
        { title: 'Blog', href: '/blog', icon: <FileText size={18} /> },
        { title: 'Contact Us', href: '/contact', icon: <Phone size={18} /> },
    ];

    const supportLinks = [
        { title: 'Help Center', href: '/help-center', icon: <Headset size={18} /> },
        { title: 'Terms of Service', href: '/terms', icon: <ClipboardList size={18} /> },
        { title: 'Privacy Policy', href: '/privacy', icon: <Shield size={18} /> },
    ];

    const getServiceIcon = (title: string, iconName?: string) => {
        // 1. Try to match by explicit icon name from DB
        if (iconName) {
            switch (iconName) {
                case 'user': return <User size={18} />;
                case 'home': return <Home size={18} />;
                case 'briefcase': return <Briefcase size={18} />;
                case 'building': return <Building size={18} />;
                case 'car': return <Car size={18} />;
                case 'bike': return <Bike size={18} />;
                case 'truck': return <Truck size={18} />;
                case 'percent': return <Percent size={18} />;
                case 'credit-card': return <CreditCard size={18} />;
            }
        }

        // 2. Fallback to title matching
        const t = title.toLowerCase();
        if (t.includes("personal")) return <User size={18} />;
        if (t.includes("home")) return <Home size={18} />;
        if (t.includes("business")) return <Briefcase size={18} />;
        if (t.includes("property")) return <Building size={18} />;
        if (t.includes("car")) return <Car size={18} />;
        if (t.includes("two") || t.includes("bike")) return <Bike size={18} />;
        return <ChevronDown size={18} />;
    };

    const handleServicesMouseEnter = () => {
        if (servicesTimeoutId) {
            clearTimeout(servicesTimeoutId);
            setServicesTimeoutId(null);
        }
        setIsServicesOpen(true);
    };

    const handleServicesMouseLeave = () => {
        const id = setTimeout(() => {
            setIsServicesOpen(false);
        }, 200); // 200ms delay before closing
        setServicesTimeoutId(id);
    };

    const handleCompanyMouseEnter = () => {
        if (companyTimeoutId) {
            clearTimeout(companyTimeoutId);
            setCompanyTimeoutId(null);
        }
        setIsCompanyOpen(true);
    };

    const handleCompanyMouseLeave = () => {
        const id = setTimeout(() => {
            setIsCompanyOpen(false);
        }, 200); // 200ms delay before closing
        setCompanyTimeoutId(id);
    };

    const handleSupportMouseEnter = () => {
        if (supportTimeoutId) {
            clearTimeout(supportTimeoutId);
            setSupportTimeoutId(null);
        }
        setIsSupportOpen(true);
    };

    const handleSupportMouseLeave = () => {
        const id = setTimeout(() => {
            setIsSupportOpen(false);
        }, 200); // 200ms delay before closing
        setSupportTimeoutId(id);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Use localhost for local dev if env not set
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';
                const res = await fetch(`${apiUrl}/loan-banner`);
                if (res.ok) {
                    const data: LoanBanner[] = await res.json();
                    setServices(data.filter(s => s.isActive));
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Image
                                src="/Logo.svg"
                                alt="SCAPITAL Logo"
                                width={190}
                                height={32}
                                priority
                                className="w-[140px] md:w-[190px] h-auto"
                            />
                        </Link>

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`font-bold text-xs tracking-widest uppercase transition-colors ${pathname === '/'
                                ? 'text-teal-600'
                                : 'text-gray-500 hover:text-teal-600'
                                }`}
                        >
                            HOME
                        </Link>

                        {/* Services Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={handleServicesMouseEnter}
                            onMouseLeave={handleServicesMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 font-bold text-xs tracking-widest uppercase transition-colors ${pathname.startsWith('/services') ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'
                                    }`}
                            >
                                SERVICES
                                <ChevronDown size={14} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isServicesOpen && (
                                <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-xl pb-2 mt-8 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                    {services.length > 0 ? (
                                        services.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.id}`}
                                                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="text-gray-600 group-hover:text-teal-600">
                                                    {getServiceIcon(service.title, service.icon)}
                                                </div>
                                                <span className="text-[15px] font-medium text-gray-800 group-hover:text-teal-600">
                                                    {service.title}
                                                </span>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-xs text-gray-400">Loading...</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Company Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={handleCompanyMouseEnter}
                            onMouseLeave={handleCompanyMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 font-bold text-xs tracking-widest uppercase transition-colors ${['/about', '/career', '/blog', '/contact'].includes(pathname) ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'
                                    }`}
                            >
                                COMPANY
                                <ChevronDown size={14} className={`transform transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isCompanyOpen && (
                                <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-b-xl pb-2 mt-8 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                    {companyLinks.map((link) => (
                                        <Link
                                            key={link.title}
                                            href={link.href}
                                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="text-gray-600 group-hover:text-teal-600">
                                                {link.icon}
                                            </div>
                                            <span className="text-[15px] font-medium text-gray-800 group-hover:text-teal-600">
                                                {link.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Support Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={handleSupportMouseEnter}
                            onMouseLeave={handleSupportMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 font-bold text-xs tracking-widest uppercase transition-colors ${['/help-center', '/terms', '/privacy'].includes(pathname) ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'
                                    }`}
                            >
                                SUPPORT
                                <ChevronDown size={14} className={`transform transition-transform ${isSupportOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isSupportOpen && (
                                <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-b-xl pb-2 mt-8 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                    {supportLinks.map((link) => (
                                        <Link
                                            key={link.title}
                                            href={link.href}
                                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="text-gray-600 group-hover:text-teal-600">
                                                {link.icon}
                                            </div>
                                            <span className="text-[15px] font-medium text-gray-800 group-hover:text-teal-600">
                                                {link.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-800 font-bold text-xs tracking-wider border-[1px] border-black px-6 py-2.5 rounded-full hover:border-teal-600 hover:text-teal-600 transition-colors uppercase">
                            Login
                        </button>
                        <button className="bg-[#111827] text-white px-6 py-2.5 border-[1px] border-black rounded-full font-bold text-xs tracking-wider hover:bg-gray-800 transition-colors uppercase">
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-teal-600 p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link href="/" className="block px-3 py-2 text-teal-600 font-medium bg-teal-50 rounded-md">
                            Home
                        </Link>

                        <div className="space-y-1">
                            <div className="px-3 py-2 text-gray-600 font-medium font-bold text-xs uppercase tracking-widest">Services</div>
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.id}`}
                                    className="block px-3 py-2 pl-6 text-gray-600 hover:bg-gray-50 hover:text-teal-600 font-medium rounded-md text-sm"
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-1 pt-2 border-t border-gray-50">
                            <div className="px-3 py-2 text-gray-600 font-medium font-bold text-xs uppercase tracking-widest">Company</div>
                            {companyLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="block px-3 py-2 pl-6 text-gray-600 hover:bg-gray-50 hover:text-teal-600 font-medium rounded-md text-sm"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-1 pt-2 border-t border-gray-50">
                            <div className="px-3 py-2 text-gray-600 font-medium font-bold text-xs uppercase tracking-widest">Support</div>
                            {supportLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="block px-3 py-2 pl-6 text-gray-600 hover:bg-gray-50 hover:text-teal-600 font-medium rounded-md text-sm"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col space-y-3">
                            <button className="w-full text-center text-teal-600 font-semibold border border-teal-600 py-2 rounded-full">
                                Log In
                            </button>
                            <button className="w-full bg-teal-900 text-white py-2 rounded-full font-medium">
                                Get App
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
