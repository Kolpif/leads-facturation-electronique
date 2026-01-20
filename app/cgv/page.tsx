import Link from 'next/link'
import { FileCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

export default function CgvPage() {
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
                Conditions générales de vente
              </h1>
              <p className="text-gray-600 mt-3">
                Dernière mise à jour : janvier 2026.
              </p>
            </div>

            <Card className="glass-morphism border-2 border-primary-100">
              <CardContent className="space-y-6 text-gray-700 leading-relaxed pt-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Objet</h2>
                  <p>
                    Les présentes conditions définissent les modalités d'utilisation du service E-Facture 2026, qui
                    propose un accompagnement et une mise en relation avec des solutions de facturation électronique.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Accès au service</h2>
                  <p>
                    L'accès au service est gratuit pour l'utilisateur. Les recommandations sont fournies à titre
                    informatif et ne constituent pas un conseil juridique ou fiscal.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Mise en relation</h2>
                  <p>
                    En soumettant vos informations via le formulaire, vous acceptez d'être recontacté afin d'obtenir des
                    informations sur des solutions adaptées. Des partenaires peuvent rémunérer E-Facture 2026 pour cette
                    mise en relation.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Responsabilité</h2>
                  <p>
                    E-Facture 2026 met en oeuvre ses meilleurs efforts pour fournir des informations à jour, mais ne
                    peut garantir l'exactitude ou l'exhaustivité des contenus. L'utilisateur demeure responsable de ses
                    choix et de la conformité de son entreprise.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Propriété intellectuelle</h2>
                  <p>
                    Le contenu du site, la marque et les éléments graphiques sont protégés. Toute reproduction sans
                    autorisation est interdite.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Données personnelles</h2>
                  <p>
                    Les informations collectées sont traitées conformément à la politique de confidentialité. Vous
                    pouvez exercer vos droits à tout moment via{' '}
                    <a href="mailto:info@efacture2026.fr" className="text-primary-600 hover:underline">
                      info@efacture2026.fr
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Modification des CGV</h2>
                  <p>
                    E-Facture 2026 peut modifier les présentes conditions à tout moment. Les nouvelles versions sont
                    applicables dès leur mise en ligne.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Droit applicable</h2>
                  <p>
                    Les présentes conditions sont soumises au droit français. En cas de litige, les parties privilégient
                    une solution amiable avant tout recours judiciaire.
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
            <Link href="/cgv" className="hover:text-white hover:underline">
              CGV
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
