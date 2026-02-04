"use client";

import { useState, useEffect } from 'react';
import { User, DollarSign, Building2, Award, TrendingUp, Activity, LucideIcon } from 'lucide-react';

interface PlatformStat {
    id: string;
    label: string;
    value: string;
    icon: string;
    suffix?: string;
    isActive: boolean;
    order: number;
}

const iconMap: Record<string, LucideIcon> = {
    'User': User,
    'DollarSign': DollarSign,
    'Building2': Building2,
    'Award': Award,
    'TrendingUp': TrendingUp,
    'Activity': Activity,
};

export default function StatsSection() {
    const [stats, setStats] = useState<PlatformStat[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://192.168.1.10:8000/api/v1/platform-stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch platform stats');
                }
                const data: PlatformStat[] = await response.json();

                // Filter active stats and sort by order
                const sortedStats = data
                    .filter(stat => stat.isActive)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));

                setStats(sortedStats);
            } catch (error) {
                console.error("Error fetching platform stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="bg-[#111827] py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => {
                        const IconComponent = iconMap[stat.icon] || Activity; // Fallback icon
                        return (
                            <div key={stat.id || index} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-[#1F2937] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                                    <IconComponent className="w-6 h-6 text-teal-400" />
                                </div>
                                <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}{stat.suffix}</h3>
                                <p className="text-gray-400 text-[8px] font-bold tracking-[0.2em] uppercase">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
