
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  imageUrl?: string;
  author?: string;
  isPopular: boolean;
  isActive: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  workingHours: string;
  address: string;
  mapUrl?: string;
  isActive: boolean;
}

// ... existing getBlogs ...

export const getContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const res = await fetch(`${API_URL}/contact-infos/active`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch contact info');
    return await res.json();
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
};


export const getBlogs = async (params?: { isPopular?: boolean; isActive?: boolean }): Promise<Blog[]> => {
  try {
    const query = new URLSearchParams();
    if (params?.isPopular !== undefined) query.append('isPopular', String(params.isPopular));
    if (params?.isActive !== undefined) query.append('isActive', String(params.isActive));
    
    // Always filter for active blogs in the public facing site unless specified otherwise
    if (params?.isActive === undefined) query.append('isActive', 'true');

    const res = await fetch(`${API_URL}/blogs?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const res = await fetch(`${API_URL}/blogs/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
};
