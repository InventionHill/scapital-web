"use client";

import { use, useEffect, useState } from 'react';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealOnScroll from '../../components/RevealOnScroll';
import { getBlogBySlug, getBlogs, Blog } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import BlogCard from '../../components/BlogCard';
import FAQSection from '@/app/components/FAQSection';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            if (slug) {
                try {
                    const data = await getBlogBySlug(slug);
                    setBlog(data);

                    if (data) {
                        // Fetch related blogs
                        const allBlogs = await getBlogs({ isActive: true });
                        const related = allBlogs
                            .filter(b => b.category === data.category && b.id !== data.id)
                            .slice(0, 3);
                        setRelatedBlogs(related);
                    }
                } catch (error) {
                    console.error("Error fetching blog details:", error);
                }
            }
            setLoading(false);
        }
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white font-sans flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white font-sans flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Blog not found</h2>
                    <p className="text-gray-500">The article you are looking for does not exist.</p>
                    <Link href="/blog" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 px-6 py-3 border border-teal-100 rounded-full hover:bg-teal-50 transition-colors">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="bg-white pt-12">
                <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="mb-4">
                            <div className="space-y-6 text-center w-full mx-auto">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                                        {blog.category}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                    {blog.title}
                                </h1>

                                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 pb-4">
                                    {blog.author && (
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User size={14} className="text-gray-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{blog.author}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {blog.imageUrl && (
                            <div className="rounded-3xl overflow-hidden shadow-lg mb-12 bg-gray-100 relative max-w-4xl mx-auto">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}

                        <div className="prose prose-lg md:prose-xl prose-teal mx-auto text-gray-600 w-full max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-teal-500 pl-4" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-600" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-teal-500 pl-4 italic my-6 bg-teal-50 p-4 rounded-r-lg text-gray-700" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-teal-600 hover:text-teal-700 underline underline-offset-2" {...props} />,
                                    code: ({ node, ...props }) => <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </RevealOnScroll>
                </article>

                {/* Related Blogs Section */}
                {relatedBlogs.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8">
                        <RevealOnScroll>
                            <h3 className="text-2xl font-bold text-[#0d9488] mb-8">Related Blog</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedBlogs.map((relatedBlog, idx) => (
                                    <BlogCard key={relatedBlog.id} blog={relatedBlog} delay={100 * (idx + 1)} />
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                )}
            </div>

            <RevealOnScroll delay={100}>
                <FAQSection />
            </RevealOnScroll>

            <Footer />
        </main>
    );
}
