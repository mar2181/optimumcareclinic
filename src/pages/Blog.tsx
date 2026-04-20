import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { format } from 'date-fns';
import heroFallback from '@/assets/blog-cash-clinic-pharr.jpg';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  tags: string[] | null;
  created_at: string;
}

const resolveImage = (url: string | null) => {
  if (!url) return heroFallback;
  if (url.startsWith('/src/assets/blog-cash-clinic-pharr')) return heroFallback;
  return url;
};

const readingTime = (excerpt: string | null) => {
  // rough estimate based on excerpt presence
  return excerpt && excerpt.length > 120 ? '5 min read' : '3 min read';
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, tags, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Helmet>
        <title>Blog | Optimum Health & Wellness Clinic — Pharr, TX</title>
        <meta
          name="description"
          content="Read the Optimum Health blog for tips on after-hours care, cash clinic savings, and family medicine in Pharr, McAllen, and the RGV."
        />
        <link rel="canonical" href="https://optimumhealthandwellnessclinic.com/blog" />
      </Helmet>

      <Navbar />

      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--primary)/0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              The Optimum Journal
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
              Honest health,<br />
              <span className="italic font-light text-accent">straight from the clinic.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Stories, guides, and plain-English advice from the team at Optimum Health —
              built for families across Pharr, McAllen, and the Rio Grande Valley.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16 max-w-6xl">
        {loading ? (
          <div className="space-y-8">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-64 rounded-2xl" />
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <Link to={`/blog/${featured.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <img
                        src={resolveImage(featured.image_url)}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(featured.created_at), 'MMM d, yyyy')}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {readingTime(featured.excerpt)}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                          {featured.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        Read the article
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    More articles
                  </h3>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
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
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </motion.div>
  );
};

export default Blog;
