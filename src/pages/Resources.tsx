import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, BookOpen, Heart, Users } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

const categoryIcons = {
  men: Heart,
  women: Heart,
  family: Users,
};

const categoryColors = {
  men: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  women: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  family: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const Resources = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, category, excerpt, image_url, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <SEOHead
        title="Health Hub | Optimum Care Pharr"
        titleEs="Centro de Salud | Optimum Care Pharr"
        description="Expert health tips and wellness resources for the Rio Grande Valley community. Men's health, women's wellness, and family care articles."
        descriptionEs="Consejos de salud y recursos de bienestar para la comunidad del Valle del Río Grande. Artículos de salud masculina, femenina y familiar."
      />
      <Navbar />

      <main className="container mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">{t.resources.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.resources.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.resources.subtitle}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['all', 'men', 'women', 'family'].map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full"
            >
              {t.resources.categories[cat as keyof typeof t.resources.categories]}
            </Button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {t.resources.noArticles}
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => {
              const CategoryIcon = categoryIcons[article.category as keyof typeof categoryIcons] || BookOpen;
              return (
                <motion.div key={article.id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow group">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={`${article.title} - health article from Optimum Care Pharr`}
                          width={400}
                          height={192}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CategoryIcon className="w-16 h-16 text-primary/30" />
                      )}
                    </div>

                    <CardContent className="p-6 flex-1">
                      <Badge
                        variant="secondary"
                        className={`mb-3 ${categoryColors[article.category as keyof typeof categoryColors] || ''}`}
                      >
                        {t.resources.categories[article.category as keyof typeof t.resources.categories]}
                      </Badge>
                      <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt || ''}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Button asChild variant="ghost" className="w-full group/btn">
                        <Link to={`/resources/${article.slug}`}>
                          {t.resources.readMore}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </motion.div>
  );
};

export default Resources;
