"use client";

import Image from 'next/image';
import { useDialog } from '../context/DialogContext';

export default function HeroSection() {
    const { openDialog } = useDialog();
    return (
        <div className="relative min-h-[500px] md:min-h-[600px] flex flex-col justify-between overflow-hidden">

            {/* Background Image */}
            {/* Desktop Background Image */}
            <div className="hidden md:block absolute inset-0">
                <Image
                    src="/Hero_Bg.svg"
                    alt="Hero Background Desktop"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Mobile Background Image */}
            <div className="block md:hidden absolute inset-0">
                <Image
                    src="/Hero_Bg2.svg"
                    alt="Hero Background Mobile"
                    fill
                    priority
                    className="object-cover object-top"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="mt-10">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight mb-6 font-poppins">
                            <span className="text-[#007A6E]">
                                Fast Loan Approvals with
                            </span>
                            <br />
                            <span className="text-black">
                                Trusted Bank Partners
                            </span>
                        </h1>
                        <p className="text-[#000000] text-lg mb-6 max-w-lg font-medium leading-relaxed">
                            Personal, Home, Business & Vehicle loans with minimal documentation and quick disbursal
                        </p>
                        <button
                            onClick={openDialog}
                            className="bg-[#007A6E] text-white px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-teal-800 transition-all "
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
