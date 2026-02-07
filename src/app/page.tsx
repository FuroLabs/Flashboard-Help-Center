import { getAllArticles } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export default function Home() {
  const articles = getAllArticles();

  // Prepare data for search (we only need metadata)
  const searchableArticles = articles.map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category
  }));

  return (
    <div className="bg-white">
      <Hero articles={searchableArticles} />
      <CategoryGrid />

      {/* Popular Articles Section (Optional, if time permits) */}
      <section className="py-16 border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
          <div className="space-y-4">
            {/* Just showing a few recent articles as 'popular' for now */}
            {articles.slice(0, 3).map(article => (
              <a key={article.slug} href={`/${article.slug}`} className="block bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{article.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
