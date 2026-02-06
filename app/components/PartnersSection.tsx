"use client";

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface BankingPartner {
    id: string;
    name: string;
    logoUrl: string;
    isActive: boolean;
    order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';

export default function PartnersSection() {
    const [partners, setPartners] = useState<BankingPartner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                // Using IP as requested by user
                const response = await fetch(`${API_URL}/banking-partners`);
                if (!response.ok) {
                    throw new Error('Failed to fetch banking partners');
                }
                const data: BankingPartner[] = await response.json();

                // Filter active partners and sort by order
                const sortedPartners = data
                    .filter(partner => partner.isActive)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));

                setPartners(sortedPartners);
            } catch (error) {
                console.error("Error fetching banking partners:", error);
            }
        };

        fetchPartners();
    }, []);

    return (
        <div className="bg-white pt-10 md:pt-15 pb-10 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Left Content */}
                    <div className="md:w-[50%] text-center md:text-left">
                        <h2 className="text-3xl md:text-[3rem] font-extrabold text-[#111827] leading-[1.1] mb-6">
                            Our 100+<br />
                            <span className="text-teal-700">Banking</span><br />
                            <span className="text-[#111827]">Partners</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 max-w-sm mx-auto md:mx-0">
                            Direct connections to elite financial nodes for rapid deployment of capital at scale.
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Activity className="text-teal-500" size={24} />
                            <span className="text-xs font-bold text-teal-600 tracking-[0.2em] uppercase">ACTIVE DEPLOYMENT NODE</span>
                        </div>
                    </div>

                    {/* Right Grid */}
                    <div className="md:w-[50%] grid grid-cols-2 md:grid-cols-3 gap-6">
                        {partners.map((partner) => (
                            <div key={partner.id} className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="w-40"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
