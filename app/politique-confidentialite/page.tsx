import Link from 'next/link'
import { FileCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <FileCheck className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-display font-bold text-gradient">
                E-Facture 2026
              </span>
            </Link>
            <Link href="/" className={buttonVariants({ size: 'sm' })}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/30 -z-10" />
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Politique de confidentialité
              </h1>
              <p className="text-gray-600 mt-3">
                Cette politique est conforme au RGPD et décrit l'utilisation de vos données.
              </p>
            </div>

            <Card className="glass-morphism border-2 border-primary-100">
              <CardContent className="space-y-6 text-gray-700 leading-relaxed pt-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Conformité RGPD</h2>
                  <p>
                    Nous collectons uniquement les données nécessaires pour vous accompagner. Vos informations sont
                    traitées de manière transparente, sécurisée et limitée à la finalité annoncée.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Données collectées</h2>
                  <p>
                    Les adresses e-mail sont collectées via le formulaire hébergé par Formspree afin de vous contacter
                    et répondre à votre demande. Les données ne sont jamais revendues.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Cookies et mesure d'audience</h2>
                  <p>
                    Nous utilisons Google Analytics pour comprendre l'usage du site et améliorer l'expérience. Ces
                    cookies permettent de mesurer l'audience de manière agrégée.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Droits des utilisateurs</h2>
                  <p>
                    Vous disposez d'un droit d'accès, de rectification, d'opposition, de suppression, de limitation et de
                    portabilité de vos données. Pour exercer vos droits, contactez-nous à :
                  </p>
                  <p className="mt-2">
                    <a href="mailto:brandon@wetelgroup.com" className="text-primary-600 hover:underline">
                      brandon@wetelgroup.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom text-center">
          <p className="text-sm">
            © 2026 E-Facture 2026. Service d'accompagnement indépendant pour la mise en conformité.
          </p>
          <p className="text-xs mt-2 opacity-75">
            Liste officielle des plateformes agréées :
            <a href="https://www.impots.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline ml-1">
              impots.gouv.fr
            </a>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <Link href="/mentions-legales" className="hover:text-white hover:underline">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/cookies" className="hover:text-white hover:underline">
              Politique de cookies
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
