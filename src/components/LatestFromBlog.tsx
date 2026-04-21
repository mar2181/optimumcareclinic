import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ArrowUpRight, Calendar, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import heroFallback from '@/assets/blog-cash-clinic-pharr.jpg';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

const resolveImage = (url: string | null) => {
  if (!url) return heroFallback;
  if (url.startsWith('/src/assets/blog-cash-clinic-pharr')) return heroFallback;
  return url;
};

const LatestFromBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              From Our Blog
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Latest from the journal
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Practical health advice and updates from our team in Pharr, TX.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            View all articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-5">
                  <img
                    src={resolveImage(post.image_url)}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestFromBlog;
