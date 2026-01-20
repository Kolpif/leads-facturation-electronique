'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, AlertTriangle, TrendingUp, Shield, Clock, ArrowRight, Building2, Users, FileCheck } from 'lucide-react'
import QuizForm from '@/components/QuizForm'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-display font-bold text-gradient">
                E-Facture 2026
              </span>
            </div>
            <Button 
              onClick={() => setShowQuiz(true)}
              size="sm"
            >
              Démarrer le Quiz
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/30 -z-10" />
        
        {/* Animated background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-float animation-delay-2000 -z-10" />

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Deadline : 1er septembre 2026</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight">
                <span className="text-gray-900">Facturation </span>
                <span className="text-gradient">Électronique</span>
                <br />
                <span className="text-gray-900">Obligatoire en 2026</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">4 millions d'entreprises</span> doivent être en conformité. 
                Trouvez <span className="font-semibold text-primary-600">gratuitement</span> la plateforme agréée adaptée à votre activité en <span className="font-semibold">2 minutes</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="xl" 
                  onClick={() => setShowQuiz(true)}
                  className="group"
                >
                  Démarrer le Quiz Gratuit
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="xl" 
                  variant="outline"
                  onClick={() => {
                    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  En savoir plus
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">2 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Sans engagement</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="space-y-6">
              <Card className="glass-morphism border-2 border-primary-100 animate-slide-up animation-delay-200">
                <CardHeader>
                  <CardTitle className="text-2xl">⏰ Urgence Réglementaire</CardTitle>
                  <CardDescription>État de la conformité en France</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Entreprises conformes</span>
                        <span className="text-sm font-bold text-primary-600">12.5%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 w-[12.5%] rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-4 bg-red-50 rounded-xl">
                        <p className="text-3xl font-bold text-red-600">3.5M+</p>
                        <p className="text-xs text-gray-600 mt-1">Non conformes</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-3xl font-bold text-green-600">500K</p>
                        <p className="text-xs text-gray-600 mt-1">Préparées</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-yellow-600" />
                      Sanctions encourues :
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>15€</strong> par facture non conforme</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>250€</strong> par manquement e-reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>500€</strong> absence de plateforme agréée</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold mb-2">101+</p>
              <p className="text-primary-100">Plateformes Agréées</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold mb-2">4M+</p>
              <p className="text-primary-100">Entreprises Concernées</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold mb-2">8 mois</p>
              <p className="text-primary-100">Avant la Deadline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Pourquoi Agir <span className="text-gradient">Maintenant</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ne laissez pas la deadline vous surprendre. Anticipez et profitez des avantages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-green-500 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Évitez les Sanctions</CardTitle>
                <CardDescription>
                  Jusqu'à <strong className="text-red-600">75 000€/an</strong> d'amendes pour non-conformité
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-blue-500 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Gagnez du Temps</CardTitle>
                <CardDescription>
                  <strong>-70%</strong> de temps de traitement des factures grâce à l'automatisation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-purple-500 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Améliorez Votre Trésorerie</CardTitle>
                <CardDescription>
                  Réduction moyenne de <strong>15 jours</strong> des délais de paiement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16 reveal" data-reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Comment ça marche
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
              Une chaîne de facturation fluide, pensée pour sécuriser chaque étape et accélérer vos encaissements.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 top-12 hidden md:block">
              <div className="h-1 bg-gradient-to-r from-blue-400 via-amber-400 to-orange-400 rounded-full opacity-40" />
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                {
                  title: 'Étape 1',
                  text: 'Préparation et émission',
                  color: 'from-blue-500 to-blue-300',
                },
                {
                  title: 'Étape 2',
                  text: 'Réception',
                  color: 'from-amber-500 to-amber-300',
                },
                {
                  title: 'Étape 3',
                  text: 'Validation',
                  color: 'from-orange-500 to-orange-300',
                },
                {
                  title: 'Étape 4',
                  text: 'Paiement',
                  color: 'from-emerald-500 to-emerald-300',
                },
              ].map((step, index) => (
                <div key={step.title} className="reveal" data-reveal>
                  <div className="relative p-6 h-full rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-bold`}>
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <ArrowRight className="h-6 w-6 text-gray-300 hidden md:block" />
                      )}
                    </div>
                    <p className="mt-6 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {step.title}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {step.text}
                    </p>
                    <div className={`absolute -top-6 -right-4 h-16 w-16 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-2xl`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Infographic Section */}
      <section className="py-20" id="benefices">
        <div className="container-custom">
          <div className="text-center mb-16 reveal" data-reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Les bénéfices de la facturation électronique
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Des gains immédiats sur les coûts, le temps et la qualité de votre cycle de facturation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: 'Économie 50-75% vs papier',
                icon: TrendingUp,
                color: 'from-blue-500/20 to-blue-500/5 dark:from-blue-500/30 dark:to-blue-500/10',
              },
              {
                title: 'Réduction coûts traitement 30%',
                icon: CheckCircle2,
                color: 'from-amber-400/30 to-amber-200/10 dark:from-amber-400/30 dark:to-amber-200/10',
              },
              {
                title: 'Optimisation temps de travail',
                icon: Clock,
                color: 'from-orange-400/30 to-orange-200/10 dark:from-orange-400/30 dark:to-orange-200/10',
              },
              {
                title: 'Diminution litiges',
                icon: Shield,
                color: 'from-blue-400/20 to-blue-200/5 dark:from-blue-400/20 dark:to-blue-200/10',
              },
              {
                title: 'Diminution délais de paiement',
                icon: FileCheck,
                color: 'from-amber-500/20 to-orange-200/10 dark:from-amber-500/20 dark:to-orange-200/10',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="reveal" data-reveal>
                <div className={`h-full rounded-3xl p-6 bg-gradient-to-br ${benefit.color} border border-white/60 dark:border-slate-800 shadow-lg`}>
                  <div className="h-12 w-12 rounded-2xl bg-white/80 dark:bg-slate-900 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is Concerned Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16 reveal" data-reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Qui est concerné ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Toutes les transactions sont progressivement concernées, y compris les échanges internationaux.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'BtoB',
                description: 'Entreprises facturant d\'autres entreprises en France.',
                icon: Building2,
                accent: 'from-blue-500/20 to-blue-500/5 dark:from-blue-500/30 dark:to-blue-500/10',
              },
              {
                title: 'BtoC',
                description: 'Entreprises facturant des particuliers, commerce ou services.',
                icon: Users,
                accent: 'from-amber-400/30 to-amber-200/10 dark:from-amber-400/30 dark:to-amber-200/10',
              },
              {
                title: 'Export',
                description: 'Ventes à des clients étrangers et opérations internationales.',
                icon: ArrowRight,
                accent: 'from-orange-400/30 to-orange-200/10 dark:from-orange-400/30 dark:to-orange-200/10',
              },
            ].map((target) => (
              <button
                key={target.title}
                type="button"
                onClick={() => setShowQuiz(true)}
                className="text-left reveal"
                data-reveal
              >
                <div className={`h-full rounded-3xl p-6 bg-gradient-to-br ${target.accent} border border-white/70 dark:border-slate-800 shadow-lg hover:-translate-y-1 transition-transform`}>
                  <div className="h-12 w-12 rounded-2xl bg-white/80 dark:bg-slate-900 flex items-center justify-center">
                    <target.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {target.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {target.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold">
                    Explorer
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Prêt à Vous Mettre en Conformité ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Répondez à 5 questions simples et recevez immédiatement les meilleures recommandations pour votre entreprise.
          </p>
          <Button 
            size="xl" 
            variant="secondary"
            onClick={() => setShowQuiz(true)}
            className="group shadow-2xl"
          >
            Démarrer le Quiz Gratuit
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-sm opacity-75">✓ 100% Gratuit  ✓ 2 minutes  ✓ Sans engagement</p>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8">
            <QuizForm onClose={() => setShowQuiz(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
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
