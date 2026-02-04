"use client";

import { useState, useEffect } from 'react';
import { Coins, Clock, TrendingUp, ArrowRight } from 'lucide-react';

interface ServiceCalculatorProps {
    serviceTitle?: string;
    defaultAmount?: number;
    minAmount?: number;
    maxAmount?: number;
    defaultTenure?: number;
    minTenure?: number;
    maxTenure?: number;
    defaultInterest?: number;
    minInterest?: number;
    maxInterest?: number;
}

export default function ServiceCalculator({
    serviceTitle = "Personal Loan",
    defaultAmount = 500000,
    minAmount = 10000,
    maxAmount = 10000000,
    defaultTenure = 5,
    minTenure = 1,
    maxTenure = 30,
    defaultInterest = 10.5,
    minInterest = 5.0,
    maxInterest = 25.0
}: ServiceCalculatorProps) {
    // Handle null values by falling back to defaults (React default props only handle undefined)
    const effectiveDefaultAmount = defaultAmount ?? 500000;
    const effectiveMinAmount = minAmount ?? 10000;
    const effectiveMaxAmount = maxAmount ?? 10000000;

    const effectiveDefaultTenure = defaultTenure ?? 5;
    const effectiveMinTenure = minTenure ?? 1;
    const effectiveMaxTenure = maxTenure ?? 30;

    const effectiveDefaultInterest = defaultInterest ?? 10.5;
    const effectiveMinInterest = minInterest ?? 5.0;
    const effectiveMaxInterest = maxInterest ?? 25.0;

    const [amount, setAmount] = useState(effectiveDefaultAmount);
    const [tenure, setTenure] = useState(effectiveDefaultTenure);
    const [rate, setRate] = useState(effectiveDefaultInterest);

    // Update state when props change (e.g. navigation between services)
    useEffect(() => {
        setAmount(effectiveDefaultAmount);
        setTenure(effectiveDefaultTenure);
        setRate(effectiveDefaultInterest);
    }, [effectiveDefaultAmount, effectiveDefaultTenure, effectiveDefaultInterest]);

    // Simple EMI Calculation
    const calculateEMI = () => {
        const principal = amount;
        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;

        if (rate === 0) return principal / months;

        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col">

            {/* Loan Amount */}
            <div className="mb-2">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <Coins size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-1">LOAN AMOUNT</p>
                        <h3 className="text-3xl font-extrabold text-[#111827]">
                            ₹ {amount.toLocaleString('en-IN')}
                        </h3>
                    </div>
                </div>

                <div className="relative h-2 bg-teal-100/50 rounded-full mb-2">
                    <input
                        type="range"
                        min={effectiveMinAmount} max={effectiveMaxAmount} step={5000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute h-full bg-teal-600 rounded-full pointer-events-none"
                        style={{ width: `${((amount - effectiveMinAmount) / (effectiveMaxAmount - effectiveMinAmount)) * 100}%` }}
                    ></div>
                    <div
                        className="absolute h-4 w-4 bg-teal-600 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none border-2 border-white shadow-sm"
                        style={{ left: `${((amount - effectiveMinAmount) / (effectiveMaxAmount - effectiveMinAmount)) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-800 uppercase mt-2">
                    <span>₹ {(effectiveMinAmount / 1000).toFixed(0)}K</span>
                    <span>₹ {(effectiveMaxAmount / 100000).toFixed(0)}L</span>
                </div>
            </div>

            {/* Tenure */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <Clock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-1">TENURE</p>
                        <h3 className="text-3xl font-extrabold text-[#111827]">
                            {tenure} Year{tenure > 1 ? 's' : ''}
                        </h3>
                    </div>
                </div>

                <div className="relative h-2 bg-teal-100/50 rounded-full mb-2">
                    <input
                        type="range"
                        min={effectiveMinTenure} max={effectiveMaxTenure} step={1}
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute h-full bg-teal-600 rounded-full pointer-events-none"
                        style={{ width: `${((tenure - effectiveMinTenure) / (effectiveMaxTenure - effectiveMinTenure)) * 100}%` }}
                    ></div>
                    <div
                        className="absolute h-4 w-4 bg-teal-600 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none border-2 border-white shadow-sm"
                        style={{ left: `${((tenure - effectiveMinTenure) / (effectiveMaxTenure - effectiveMinTenure)) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-800 uppercase mt-2">
                    <span>{effectiveMinTenure} YEAR</span>
                    <span>{effectiveMaxTenure} YEAR</span>
                </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <TrendingUp size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-1">INTEREST RATES</p>
                        <h3 className="text-3xl font-extrabold text-[#111827]">
                            {rate}%
                        </h3>
                    </div>
                </div>

                <div className="relative h-2 bg-teal-100/50 rounded-full mb-2">
                    <input
                        type="range"
                        min={effectiveMinInterest} max={effectiveMaxInterest} step={0.1}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute h-full bg-teal-600 rounded-full pointer-events-none"
                        style={{ width: `${((rate - effectiveMinInterest) / (effectiveMaxInterest - effectiveMinInterest)) * 100}%` }}
                    ></div>
                    <div
                        className="absolute h-4 w-4 bg-teal-600 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none border-2 border-white shadow-sm"
                        style={{ left: `${((rate - effectiveMinInterest) / (effectiveMaxInterest - effectiveMinInterest)) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-800 uppercase mt-2">
                    <span>{effectiveMinInterest}%</span>
                    <span>{effectiveMaxInterest}%</span>
                </div>
            </div>

            {/* Result Box */}
            <div className="mt-auto">
                <div className="flex items-center justify-between border border-teal-100 rounded-xl p-6 mb-6">
                    <h3 className="text-3xl font-extrabold text-[#111827] flex items-center">
                        ₹ {emi.toLocaleString('en-IN')}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        EMI AMOUNT
                    </span>
                </div>

                <button className="w-full bg-[#137a78] hover:bg-teal-700 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-lg transition-colors shadow-lg shadow-teal-700/20">
                    Apply for {serviceTitle}
                </button>
            </div>

        </div>
    );
}
