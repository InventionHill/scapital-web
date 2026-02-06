"use client";

import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Forms from '../components/Forms';
import Navbar from '../components/Navbar';
import RevealOnScroll from '../components/RevealOnScroll';
import { getBlogs, Blog } from '../lib/api';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const popularRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all active blogs
                const blogs = await getBlogs({ isActive: true });
                setAllBlogs(blogs);

                // Fetch popular blogs
                const popular = await getBlogs({ isActive: true, isPopular: true });
                setPopularBlogs(popular);
            } catch (error) {
                console.error("Failed to load blogs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const [visibleCount, setVisibleCount] = useState(6);

    const filteredBlogs = allBlogs.filter(blog =>
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recentBlogs = filteredBlogs.slice(0, 3);
    // previouslyBlogs are those after the first 3
    const previouslyBlogsAll = filteredBlogs.slice(3);
    const previouslyBlogs = previouslyBlogsAll.slice(0, visibleCount);

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const scrollToPopular = () => {
        popularRef.current?.scrollIntoView({ behavior: 'smooth' });
    };



    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white pt-8 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="hover:text-teal-600 cursor-pointer">Company</span>
                        <ChevronRight size={14} />
                        <span className="text-teal-600">Blog</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white pb-8 md:pb-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content */}
                        <RevealOnScroll className="space-y-4">
                            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#1f2937] leading-[1.1] tracking-tight">
                                Get in Touch With Our Loan Experts for Fast, Reliable
                                <br />
                                <span className="text-[#0d9488]">Guidance and Support</span>
                            </h1>

                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl font-medium">
                                Get in touch with our loan experts for fast and reliable financial guidance tailored to your needs. Our team helps you understand the best loan options, eligibility, and documentation with complete transparency. Connect with us for quick support and a smooth, hassle-free loan process.
                            </p>

                            {popularBlogs.length > 0 && (
                                <div className="pt-2">
                                    <button
                                        onClick={scrollToPopular}
                                        className="bg-[#137a78] hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        Explore Popular Articles
                                    </button>
                                </div>
                            )}
                        </RevealOnScroll>

                        {/* Right Content - Image */}
                        <RevealOnScroll className="relative" delay={200}>
                            <div className="relative z-10">
                                <img
                                    src="/Blog.svg"
                                    alt="Blog Hero"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>


            {/* Blog Section */}
            <div className="bg-white pt-12 md:pt-15 pb-2 md:pb-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <RevealOnScroll delay={100}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937]">Browse by category</h2>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search a category"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-[#0d9488] rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-[#0d9488] text-sm text-gray-900 placeholder:text-gray-500 caret-[#0d9488]"
                                />
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Subheader */}
                    <RevealOnScroll className="mb-8">
                        <h3 className="text-2xl font-bold text-[#0d9488]">Recent Blog</h3>
                    </RevealOnScroll>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="col-span-full text-center py-20 text-gray-500">Loading blogs...</div>
                        ) : recentBlogs.length > 0 ? (
                            recentBlogs.map((blog, idx) => <BlogCard key={blog.id} blog={blog} delay={100 * (idx + 1)} />)
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-400">No recent blogs found.</div>
                        )}
                    </div>

                    {/* Popular Blog Subheader */}
                    {popularBlogs.length > 0 && (
                        <div ref={popularRef}>
                            <RevealOnScroll className="mb-8 mt-16">
                                <h3 className="text-2xl font-bold text-[#0d9488]">Popular Blog</h3>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {popularBlogs.map((blog, idx) => <BlogCard key={blog.id} blog={blog} delay={100 * (idx + 1)} />)}
                            </div>
                        </div>
                    )}

                    {/* Previously Blog Subheader */}
                    {previouslyBlogs.length > 0 && (
                        <>
                            <RevealOnScroll className="mb-8 mt-16">
                                <h3 className="text-2xl font-bold text-[#0d9488]">Previously Blog</h3>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {previouslyBlogs.map((blog, idx) => <BlogCard key={blog.id} blog={blog} delay={100 * (idx + 1)} />)}
                            </div>

                            {previouslyBlogsAll.length > visibleCount && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={handleSeeMore}
                                        className="bg-[#137a78] hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        See More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <RevealOnScroll delay={100}>
                <FAQSection />
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <Forms />
            </RevealOnScroll>

            <Footer />
        </main>
    );
}
