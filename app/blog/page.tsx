import Link from 'next/link'
import { FileCheck } from 'lucide-react'
import { articles } from './articles'

export const metadata = {
  title: 'Blog Facturation Électronique 2026',
  description:
    'Conseils, guides et actualités sur la facturation électronique 2026 : obligations, plateformes, formats et conformité.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <FileCheck className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-display font-bold text-gradient">
                E-Facture 2026
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-semibold text-gray-700">
              <Link href="/" className="hover:text-primary-600">
                Accueil
              </Link>
              <span className="text-primary-600">Blog</span>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/60 via-white to-secondary-50/40 -z-10" />
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-primary-600 font-semibold">
              Blog Facturation Électronique
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold text-gray-900">
              Guides et conseils pour réussir la réforme 2026
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Explorez nos articles SEO sur la facturation électronique 2026 : calendrier, plateformes, sanctions, formats et checklists pour rester conforme.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
                  {article.keyword}
                </p>
                <h2 className="mt-3 text-xl font-display font-bold text-gray-900 group-hover:text-primary-700">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  {article.description}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                  <span>Publié le {article.date}</span>
                  <span>{article.readingTime} de lecture</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
