import { FileText, Clock, Home, Zap } from 'lucide-react';

const features = [
    {
        icon: <FileText className="w-8 h-8 text-white" />,
        title: "Minimal Documentation",
        description: "Get started easily with just your bank statements"
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "Apply in Minutes",
        description: "Fast and hassle-free loan approval with a fully online process."
    },
    {
        icon: <Home className="w-8 h-8 text-white" />,
        title: "Collateral Free",
        description: "Scale your business without pledging assets"
    },
    {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: "Instant Loan Approval",
        description: "Receive your loan amount within 3 days, without delays."
    }
];

export default function WhyChooseSection() {
    return (
        <div className="bg-white md:py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-1 leading-tight">Why Choose</h2>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-teal-700 leading-tight">SCAPITAL ?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 md:p-8 rounded-[1rem] border border-teal-500 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-teal-50">
                            <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
                            <p className="text-[#4B5563] text-base leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
