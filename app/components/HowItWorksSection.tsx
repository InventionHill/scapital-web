import { Upload, FileText, Fingerprint, MessageSquare, Send } from 'lucide-react';

const steps = [
    {
        icon: <Upload size={28} strokeWidth={1.5} />,
        title: "Apply Online",
        desc: "Fill our rapid digital application with basic details."
    },
    {
        icon: <FileText size={28} strokeWidth={1.5} />,
        title: "Document Upload",
        desc: "Upload bank statements & identity via our encrypted portal."
    },
    {
        icon: <Fingerprint size={28} strokeWidth={1.5} />,
        title: "Verification",
        desc: "Our smart algorithms verify your financial profile instantly."
    },
    {
        icon: <MessageSquare size={28} strokeWidth={1.5} />,
        title: "Approval",
        desc: "Receive your final offer and digital sanction letter."
    },
    {
        icon: <Send size={28} strokeWidth={1.5} />,
        title: "Disbursal",
        desc: "Funds are credited directly to your bank account."
    },
];

export default function HowItWorksSection() {
    return (
        <div className="bg-white pt-10 md:pt-18 pb:0 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-4">How It <span className="text-teal-700">Works.</span></h2>
                    <p className="text-gray-500 font-semibold max-w-3xl mx-auto text-lg leading-relaxed">
                        From application to funds in your account, we've engineered every second for transparency and speed.
                    </p>
                </div>

                <div className="relative">

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 gap-x-10 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group h-full justify-between">
                                {/* Top Content */}
                                <div className="flex flex-col items-center mb-4">
                                    <div className="w-22 h-22 bg-teal-50/30 rounded-full border-2 border-dashed border-teal-600 flex items-center justify-center text-teal-700 mb-4 p-2">
                                        <div className="w-full h-full bg-teal-700 rounded-full flex items-center justify-center text-white">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#111827] mb-3 leading-tight">{step.title}</h3>
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed max-w-[180px]">{step.desc}</p>
                                </div>

                                {/* Bottom Number (anchored) */}
                                <div className="mt-auto relative">
                                    <div className="w-12 h-12 rounded-full bg-white text-teal-600 flex items-center justify-center text-xl font-bold border-2 border-teal-600 relative z-10">
                                        {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connector Line at Bottom */}
                    <div className="hidden md:block absolute bottom-[1.5rem] left-[10%] w-[80%] h-[2px] bg-teal-600 z-0"></div>
                </div>
            </div>
        </div>
    );
}
