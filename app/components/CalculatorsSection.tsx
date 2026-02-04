"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PiggyBank } from 'lucide-react'; // Fallback icon

export default function CalculatorsSection() {
    const [amount, setAmount] = useState(150000);
    const [interest, setInterest] = useState(10.5);
    const [tenure, setTenure] = useState(24);

    // Simple EMI Calculation: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const calculateEMI = () => {
        const r = interest / 12 / 100;
        const n = tenure;
        if (interest === 0) return amount / tenure;
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();
    const totalAmount = emi * tenure;

    return (
        <div className="bg-[#FAFAFA] py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Smart Financial</h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600">Calculators</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Calculator Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex gap-8 mb-8 border-b border-gray-100 pb-4">
                            <button className="flex items-center gap-2 text-teal-600 font-semibold border-b-2 border-teal-600 pb-4 -mb-4.5">
                                <span className="w-5 h-5 rounded-full border-2 border-teal-600 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-teal-600 rounded-full"></div>
                                </span>
                                EMI Calculator
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 font-medium pb-4 -mb-4.5 hover:text-gray-600 transition-colors">
                                <span className="w-5 h-5 rounded-full border-2 border-gray-300"></span>
                                Loan Amount
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Amount Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-gray-600 font-medium">Loan Amount</label>
                                    <span className="text-gray-900 font-bold">₹ {amount.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="1000000"
                                    step="5000"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>₹10K</span>
                                    <span>₹10L</span>
                                </div>
                            </div>

                            {/* Interest Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-gray-600 font-medium">Interest Rate</label>
                                    <span className="text-gray-900 font-bold">{interest} %</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="20"
                                    step="0.1"
                                    value={interest}
                                    onChange={(e) => setInterest(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>5%</span>
                                    <span>20%</span>
                                </div>
                            </div>

                            {/* Tenure Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-gray-600 font-medium">Tenure</label>
                                    <span className="text-gray-900 font-bold">{tenure} Months</span>
                                </div>
                                <input
                                    type="range"
                                    min="6"
                                    max="60"
                                    step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>6M</span>
                                    <span>60M</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="relative bg-[#111827] text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden">
                        {/* Decorative Circle */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full z-0"></div>

                        {/* Background Image of Man */}
                        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 pointer-events-none z-0">
                            <img src="/calculator-man.png" alt="Happy client" className="w-full h-full object-contain object-bottom" />
                        </div>

                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm mb-1">Your Monthly EMI</p>
                            <h3 className="text-4xl md:text-5xl font-bold text-teal-400 mb-8">₹ {emi.toLocaleString('en-IN')}</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-400">Total Interest</span>
                                    <span className="font-semibold">₹ {(totalAmount - amount).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-400">Total Payable</span>
                                    <span className="font-semibold">₹ {totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <button className="relative z-10 bg-teal-600 text-white w-full py-4 rounded-xl font-bold mt-8 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-900/50">
                            Check Eligibility
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
