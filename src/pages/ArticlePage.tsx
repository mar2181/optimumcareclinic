import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, BookOpen, Heart, Users } from 'lucide-react';
import { format } from 'date-fns';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

const categoryColors = {
  men: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  women: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  family: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const categoryIcons = {
  men: Heart,
  women: Heart,
  family: Users,
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4">
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

      // Lists
      if (paragraph.includes('\n- ')) {
        const lines = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
            {lines.map((line, i) => {
              if (line.startsWith('- ')) {
                // Handle bold text in list items
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
              return <span key={i}>{line}</span>;
            })}
          </ul>
        );
      }

      // Regular paragraphs with bold text support
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
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button asChild>
            <Link to="/resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.resources.backToHub}
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const CategoryIcon = categoryIcons[article.category as keyof typeof categoryIcons] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.resources.backToHub}
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Badge
            variant="secondary"
            className={`mb-4 ${categoryColors[article.category as keyof typeof categoryColors] || ''}`}
          >
            {t.resources.categories[article.category as keyof typeof t.resources.categories]}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(article.created_at), 'MMMM d, yyyy')}</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-primary/10 to-accent/10"
        >
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CategoryIcon className="w-24 h-24 text-primary/30" />
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          {renderContent(article.content)}
        </motion.article>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ready to Visit Us?
          </h3>
          <p className="text-muted-foreground mb-4">
            Walk-ins welcome at Optimum Health & Wellness Clinic. No appointment needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/check-in">{t.hero.checkInOnline}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+19566273258">Call (956) 627-3258</a>
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default ArticlePage;
