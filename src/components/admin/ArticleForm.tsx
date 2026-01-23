import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, FileText, Plus } from 'lucide-react';

const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  category: z.enum(['men', 'women', 'family']),
  excerpt: z.string().max(300, 'Excerpt must be under 300 characters').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const ArticleForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'family',
      excerpt: '',
      content: '',
      image_url: '',
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    // Auto-generate slug if it's empty or matches previous auto-generated
    const currentSlug = form.getValues('slug');
    if (!currentSlug || currentSlug === generateSlug(form.getValues('title').slice(0, -1))) {
      form.setValue('slug', generateSlug(title));
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('articles').insert({
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt || null,
      content: data.content,
      image_url: data.image_url || null,
      published: true,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.code === '23505' 
          ? 'An article with this slug already exists.' 
          : 'Failed to create article. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Article Published!',
      description: 'Your article is now live on the Health Hub.',
    });

    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Post New Article
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={handleTitleChange}
                      placeholder="e.g., Benefits of IV Therapy in Pharr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., iv-therapy-benefits-pharr"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    URL: /resources/{field.value || 'your-slug'}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="family">Family Health</SelectItem>
                      <SelectItem value="men">Men's Health</SelectItem>
                      <SelectItem value="women">Women's Health</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt (SEO Description)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Brief description for search results (max 300 chars)"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Article content. Use ## for headers, **bold** for emphasis, - for lists."
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Publish Article
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
