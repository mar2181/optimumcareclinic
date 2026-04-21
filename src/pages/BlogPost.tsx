import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Clock, Phone } from 'lucide-react';
import { format } from 'date-fns';
import heroFallback from '@/assets/blog-cash-clinic-pharr.jpg';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  tags: string[] | null;
  meta_description: string | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
}

const resolveImage = (url: string | null) => {
  if (!url) return heroFallback;
  if (url.startsWith('/src/assets/blog-cash-clinic-pharr')) return heroFallback;
  return url;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (data) {
        setPost(data);
        const { data: others } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .neq('id', data.id)
          .order('created_at', { ascending: false })
          .limit(3);
        if (others) setRelated(others);
      }
      setLoading(false);
    };
    fetchPost();
    window.scrollTo({ top: 0 });
  }, [slug]);

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-3 tracking-tight">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mt-14 mb-5 tracking-tight">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.includes('\n- ')) {
        const lines = paragraph.split('\n');
        return (
          <ul key={index} className="space-y-3 my-6 pl-1">
            {lines.map((line, i) => {
              if (line.startsWith('- ')) {
                const text = line.replace('- ', '');
                const parts = text.split(/\*\*(.+?)\*\*/g);
                return (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      {parts.map((part, j) =>
                        j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part
                      )}
                    </span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        );
      }
      const parts = paragraph.split(/\*\*(.+?)\*\*/g);
      return (
        <p key={index} className="text-base md:text-lg text-muted-foreground leading-[1.8] my-5">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-12 max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-96 w-full mb-8 rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const url = `https://optimumhealthandwellnessclinic.com/blog/${post.slug}`;
  const description = post.meta_description || post.excerpt || '';
  const wordCount = post.content.split(/\s+/).length;
  const minutes = Math.max(2, Math.round(wordCount / 220));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: post.image_url || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author_name || 'Optimum Health & Wellness Clinic' },
    publisher: { '@type': 'Organization', name: 'Optimum Health & Wellness Clinic' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Helmet>
        <title>{post.title} | Optimum Health Blog</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      {/* Editorial header */}
      <article>
        <header className="container mx-auto px-6 pt-12 pb-10 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wider font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-light">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-8 border-b border-border">
            {post.author_name && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {post.author_name.charAt(0)}
                </div>
                <span className="font-medium text-foreground">{post.author_name}</span>
              </div>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {minutes} min read
            </span>
          </div>
        </header>

        {/* Full-bleed hero image */}
        <div className="container mx-auto px-6 max-w-5xl mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted shadow-2xl shadow-primary/5">
            <img
              src={resolveImage(post.image_url)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose-content">{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="mt-16 mb-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-10 text-primary-foreground">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-3">
                Walk in tonight
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                $70 visits. Open until 10 PM.
              </h3>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                No insurance required. No appointment needed. Real care from a real physician,
                seven days a week.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                  <Link to="/check-in">Check In Online</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="tel:+19566273258">
                    <Phone className="w-4 h-4 mr-2" />
                    (956) 627-3258
                  </a>
                </Button>
              </div>

              {/* Inline contextual links for SEO */}
              <p className="mt-8 pt-6 border-t border-primary-foreground/20 text-sm text-primary-foreground/80">
                Related: {' '}
                <Link to="/services" className="underline underline-offset-4 hover:text-primary-foreground">All services</Link>
                {' · '}
                <Link to="/wound-care" className="underline underline-offset-4 hover:text-primary-foreground">Wound care</Link>
                {' · '}
                <Link to="/about" className="underline underline-offset-4 hover:text-primary-foreground">Meet our team</Link>
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Related articles
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-4">
                      <img
                        src={resolveImage(r.image_url)}
                        alt={r.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                    {r.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </motion.div>
  );
};

export default BlogPostPage;
