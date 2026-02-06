import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Blog } from '../lib/api';

interface BlogCardProps {
    blog: Blog;
    delay?: number;
}

const BlogCard = ({ blog, delay = 100 }: BlogCardProps) => {
    return (
        <RevealOnScroll delay={delay}>
            <div className="group cursor-pointer">
                <Link href={`/blog/${blog.slug}`}>
                    <div className="rounded-2xl overflow-hidden mb-6 h-64 w-full bg-gray-100 relative">
                        {blog.imageUrl ? (
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                        <span className="absolute top-4 left-4 bg-[#0d9488] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {blog.category}
                        </span>
                    </div>
                    <div className="space-y-3">
                        <span className="text-sm text-gray-500 font-medium">
                            {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <h4 className="text-xl font-bold text-[#1f2937] leading-tight group-hover:text-teal-600 transition-colors">
                            {blog.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {blog.content}
                        </p>
                        <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm mt-2 group-hover:gap-3 transition-all">
                            Read More <ArrowRight size={16} />
                        </div>
                    </div>
                </Link>
            </div>
        </RevealOnScroll>
    );
};

export default BlogCard;
