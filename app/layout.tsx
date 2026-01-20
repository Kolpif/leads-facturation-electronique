import type { Metadata } from 'next'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Facturation Électronique 2026 - Trouvez Votre Plateforme Agréée',
  description: 'Mettez votre entreprise en conformité avec la réforme de la facturation électronique. Comparez les plateformes agréées et trouvez la solution adaptée à votre activité avant septembre 2026.',
  keywords: 'facturation électronique, plateforme agréée, PDP, PA, e-invoicing, réforme 2026, facture électronique B2B',
  openGraph: {
    title: 'Facturation Électronique 2026 - Trouvez Votre Plateforme Agréée',
    description: 'Mettez votre entreprise en conformité avec la réforme de la facturation électronique avant septembre 2026.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
