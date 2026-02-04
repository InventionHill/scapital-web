"use client";

import { useState, useEffect } from 'react';
import { Coins, Clock, TrendingUp, Receipt, ArrowRight } from 'lucide-react';

interface LoanType {
    id: string;
    name: string;
    defaultRate: number;
    defaultTenure: number;
    defaultAmount: number;
    minAmount: number;
    maxAmount: number;
    minTenure: number;
    maxTenure: number;
    minInterest: number;
    maxInterest: number;
}

interface Props {
    defaultTabId?: string;
    compact?: boolean;
}

export default function SmartCalculatorsSection({ defaultTabId, compact = false }: Props) {
    const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<LoanType | null>(null);

    // Form states
    const [amount, setAmount] = useState<number>(0);
    const [years, setYears] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);

    useEffect(() => {
        async function fetchLoanTypes() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.10:8000/api/v1';
                const res = await fetch(`${apiUrl}/loan-banner`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                // Map API data to LoanType
                const mapped: LoanType[] = data
                    .filter((item: any) => item.isActive)
                    .map((item: any) => ({
                        id: item.id,
                        name: item.title,
                        defaultRate: item.defaultInterest || 10.5,
                        defaultTenure: item.defaultTenure || 5,
                        defaultAmount: item.defaultAmount || 500000,
                        minAmount: item.minAmount || 10000,
                        maxAmount: item.maxAmount || 10000000,
                        minTenure: item.minTenure || 1,
                        maxTenure: item.maxTenure || 30,
                        minInterest: item.minInterest || 5.0,
                        maxInterest: item.maxInterest || 25.0
                    }))
                    .sort((a: any, b: any) => a.order - b.order); // Assuming order exists, else ignore

                if (mapped.length > 0) {
                    setLoanTypes(mapped);

                    // Set initial active tab
                    const initial = defaultTabId
                        ? mapped.find(t => t.name.toLowerCase() === defaultTabId.toLowerCase() || t.id === defaultTabId)
                        : mapped[0];

                    setActiveTab(initial || mapped[0]);
                }
            } catch (err) {
                console.error("Using fallback loan types due to API error:", err);
                // Fallback hardcoded types if API fails
                const fallbackTypes: LoanType[] = [
                    { id: 'personal', name: 'Personal Loan', defaultRate: 10.5, defaultTenure: 5, defaultAmount: 500000, minAmount: 10000, maxAmount: 5000000, minTenure: 1, maxTenure: 10, minInterest: 8, maxInterest: 20 },
                    { id: 'home', name: 'Home Loan', defaultRate: 8.5, defaultTenure: 20, defaultAmount: 5000000, minAmount: 100000, maxAmount: 100000000, minTenure: 1, maxTenure: 30, minInterest: 7, maxInterest: 15 },
                ];
                setLoanTypes(fallbackTypes);
                setActiveTab(fallbackTypes[0]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLoanTypes();
    }, [defaultTabId]);

    // Reset values when activeTab changes
    useEffect(() => {
        if (activeTab) {
            setAmount(activeTab.defaultAmount);
            setYears(activeTab.defaultTenure);
            setRate(activeTab.defaultRate);
        }
    }, [activeTab]);

    // Calculation Logic
    const calculateEMI = () => {
        const principal = amount;
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;

        if (rate === 0) return principal / months;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return emi;
    };

    if (isLoading || !activeTab) {
        return <div className="py-20 text-center text-gray-400">Loading calculators...</div>;
    }

    const emi = calculateEMI();
    const totalPayment = emi * years * 12;
    const totalInterest = totalPayment - amount;

    // Ratio for bar
    const principalPercent = (amount / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    return (
        <div className={compact ? "w-full" : "pt-12 md:py-16 font-sans bg-white"} id="calculators">
            {/* Header & Tabs - Hidden in compact mode */}
            {!compact && (
                <>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] leading-tight">Smart Financial</h2>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-teal-700 leading-tight">Calculators</h2>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mb-14">
                        <div className="flex flex-wrap justify-center gap-4">
                            {loanTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type)}
                                    className={`flex items-center gap-2 px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition ${activeTab.id === type.id
                                        ? 'bg-teal-700 text-white shadow-lg'
                                        : 'bg-white text-gray-400 border border-gray-100'
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${activeTab.id === type.id ? 'bg-white' : 'bg-gray-300'}`}></div>
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className={compact ? "" : "max-w-6xl mx-auto px-4"}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Card: Inputs */}
                    <div className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.1)] h-full flex flex-col justify-between">

                        {/* Amount Slider */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                    <Coins size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Loan amount</p>
                                    <h3 className="text-3xl font-bold text-gray-800">₹ {amount.toLocaleString('en-IN')}</h3>
                                </div>
                            </div>
                            <input
                                type="range"
                                min={activeTab.minAmount} max={activeTab.maxAmount} step={5000}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                <span>₹ {(activeTab.minAmount / 1000).toFixed(0)}K</span>
                                <span>₹ {(activeTab.maxAmount / 100000).toFixed(0)}L</span>
                            </div>
                        </div>

                        {/* Years Slider */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Tenure</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{years} Years</h3>
                                </div>
                            </div>
                            <input
                                type="range"
                                min={activeTab.minTenure} max={activeTab.maxTenure} step={1}
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                <span>{activeTab.minTenure} Year</span>
                                <span>{activeTab.maxTenure} Years</span>
                            </div>
                        </div>

                        {/* Rate Slider */}
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Interest Rates</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{rate.toFixed(1)}%</h3>
                                </div>
                            </div>
                            <input
                                type="range"
                                min={activeTab.minInterest} max={activeTab.maxInterest} step={0.1}
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                <span>{activeTab.minInterest}%</span>
                                <span>{activeTab.maxInterest}%</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Card: Results */}
                    <div className="flex flex-col gap-8 h-full justify-between">
                        <div className="bg-[#1F2937] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex-grow flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Monthly EMI</p>
                                    <h3 className="text-5xl font-bold text-teal-500">₹ {Math.round(emi).toLocaleString('en-IN')}</h3>
                                </div>
                                <div className="w-12 h-12 bg-teal-900/50 rounded-lg flex items-center justify-center text-teal-500 border border-teal-800">
                                    <Receipt size={24} />
                                </div>
                            </div>

                            {/* Ratio Bar */}
                            <div className="mb-12">
                                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">
                                    <span>PRINCIPAL RATIO</span>
                                    <span>INTEREST RATIO</span>
                                </div>
                                <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden flex">
                                    <div style={{ width: `${principalPercent}%` }} className="h-full bg-teal-600"></div>
                                    <div style={{ width: `${interestPercent}%` }} className="h-full bg-gray-500"></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">
                                    <span>{Math.round(principalPercent)}%</span>
                                    <span>{Math.round(interestPercent)}%</span>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="grid grid-cols-2 gap-8 border-t border-gray-700 pt-8">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">TOTAL INTEREST</p>
                                    <h4 className="text-2xl font-bold text-white">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</h4>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">TOTAL PAYMENT</p>
                                    <h4 className="text-2xl font-bold text-white">₹ {Math.round(totalPayment).toLocaleString('en-IN')}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex flex-col items-center gap-4">
                            <button className="w-full bg-teal-700 text-white py-6 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-3">
                                APPLY FOR {activeTab.name}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}