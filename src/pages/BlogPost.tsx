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
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
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
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.includes('\n- ')) {
        const lines = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
            {lines.map((line, i) => {
              if (line.startsWith('- ')) {
                const text = line.replace('- ', '');
                const parts = text.split(/\*\*(.+?)\*\*/g);
                return (
                  <li key={i}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                    )}
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
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
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
          <Skeleton className="h-64 w-full mb-8" />
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: post.image_url || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author_name || 'Optimum Health & Wellness Clinic' },
    publisher: {
      '@type': 'Organization',
      name: 'Optimum Health & Wellness Clinic',
    },
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

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </Button>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
            </div>
            {post.author_name && <span>By {post.author_name}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-primary/10 to-accent/10">
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-primary/30" />
            </div>
          )}
        </div>

        <article className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </article>

        <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
          <h3 className="text-lg font-semibold text-foreground mb-2">Walk In Tonight</h3>
          <p className="text-muted-foreground mb-4">
            Open 5 PM – 10 PM, 7 days a week. Just $70 per visit. No insurance needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/check-in">Check In Online</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+19566273258">Call (956) 627-3258</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BlogPost;
