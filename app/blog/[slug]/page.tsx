import Link from 'next/link'
import { FileCheck } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles, getArticleBySlug } from '../articles'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article introuvable',
      description: 'Cet article est introuvable.',
    }
  }

  return {
    title: `${article.title} | Blog Facturation Électronique 2026`,
    description: article.description,
    keywords: article.keyword,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

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
              <Link href="/blog" className="text-primary-600">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
              {article.keyword}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold text-gray-900">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>Publié le {article.date}</span>
              <span className="text-gray-300">•</span>
              <span>{article.readingTime} de lecture</span>
            </div>
            <div
              className="article-content mt-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
