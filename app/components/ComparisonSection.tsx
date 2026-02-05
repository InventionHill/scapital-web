"use client";

import { useState, useEffect } from 'react';
import { AppIcon } from './AppIcon';

interface LoanProduct {
    id: string;
    name: string;
    icon: string;
    order: number;
}
// ... interface definitions unchanged

export default function ComparisonSection() {
    const [products, setProducts] = useState<LoanProduct[]>([]);
    const [parameters, setParameters] = useState<ComparisonParameter[]>([]);
    const [values, setValues] = useState<ComparisonValue[]>([]);

    useEffect(() => {
        // ... fetchData logic unchanged
        const fetchData = async () => {
            try {
                // Fetch Products
                const productsRes = await fetch('http://192.168.1.10:8000/api/v1/loan-comparison/products');
                if (!productsRes.ok) throw new Error('Failed to fetch products');
                const productsData: LoanProduct[] = await productsRes.json();
                setProducts(productsData.sort((a, b) => a.order - b.order));

                // Fetch Parameters
                const paramsRes = await fetch('http://192.168.1.10:8000/api/v1/loan-comparison/parameters');
                if (!paramsRes.ok) throw new Error('Failed to fetch parameters');
                const paramsData: ComparisonParameter[] = await paramsRes.json();
                setParameters(paramsData.sort((a, b) => a.order - b.order));

                // Fetch Values
                const valuesRes = await fetch('http://192.168.1.10:8000/api/v1/loan-comparison/values');
                if (!valuesRes.ok) throw new Error('Failed to fetch values');
                const valuesData: ComparisonValue[] = await valuesRes.json();
                setValues(valuesData);

            } catch (error) {
                console.error("Error fetching comparison data:", error);
            }
        };

        fetchData();
    }, []);

    const getValue = (productId: string, parameterId: string) => {
        const found = values.find(v => v.productId === productId && v.parameterId === parameterId);
        return found ? found.value : '-';
    };

    return (
        <div className="bg-white pt-16 md:pt-24 pb-4 md:pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-[#111827] leading-tight">Analyze & Compare</h2>
                    <h2 className="text-3xl md:text-[3rem] font-extrabold text-teal-700 leading-tight">Choose Smart</h2>
                    <p className="text-gray-500 font-semibold max-w-3xl mx-auto text-lg leading-relaxed mt-3">
                        Direct side-by-side assessment of our core financial products to help you make the most informed decision.
                    </p>
                </div>

                <div className="overflow-hidden overflow-x-auto rounded-[2rem] border border-gray-100 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#111827] text-white">
                                {/* First Column Header (Empty/Label) */}
                                <th className="p-5 text-lg font-medium border-r border-gray-700/50 last:border-r-0 text-left align-middle">
                                    <div className="flex items-center gap-3">
                                        <span>Title</span>
                                    </div>
                                </th>
                                {/* Product Headers */}
                                {products.map((product) => {
                                    return (
                                        <th
                                            key={product.id}
                                            className="p-5 text-lg font-medium border-r border-gray-700/50 last:border-r-0 text-left align-middle"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AppIcon name={product.icon} className="w-5 h-5 text-teal-400" />
                                                <span>{product.name}</span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 font-medium">
                            {parameters.map((param, rIdx) => (
                                <tr key={param.id} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F3F8F9]'}>
                                    {/* Parameter Label */}
                                    <td className="p-6 text-[#1F2937] border-r border-gray-100 last:border-r-0 font-bold">
                                        {param.title}
                                    </td>
                                    {/* Values for each product */}
                                    {products.map((product) => (
                                        <td key={`${product.id}-${param.id}`} className="p-6 text-[#1F2937] border-r border-gray-100 last:border-r-0">
                                            {getValue(product.id, param.id)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {/* Button Row */}
                            <tr className="bg-white">
                                <td className="p-6 border-r border-gray-100 last:border-r-0 text-center"></td>
                                {products.map((product) => (
                                    <td key={`btn-${product.id}`} className="p-6 border-r border-gray-100 last:border-r-0 text-center">
                                        <button className="bg-teal-700 text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-teal-800 transition-colors">
                                            Apply Now
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
