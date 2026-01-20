'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { X, ArrowRight, ArrowLeft, CheckCircle2, Building2, Package, Calculator, Laptop, Calendar } from 'lucide-react'
import { validateSIREN, validateEmail, validatePhoneNumber } from '@/lib/utils'
import axios from 'axios'

interface QuizData {
  // Quiz responses
  companySize: string
  sector: string
  invoicesPerMonth: string
  currentSoftware: string
  timeline: string
  
  // Contact info
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  siren: string
  ca: string
}

export default function QuizForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<QuizData>>({})
  
  const [formData, setFormData] = useState<QuizData>({
    companySize: '',
    sector: '',
    invoicesPerMonth: '',
    currentSoftware: '',
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    siren: '',
    ca: '',
  })

  const totalSteps = 6

  const updateField = (field: keyof QuizData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = () => {
    const newErrors: Partial<QuizData> = {}
    
    if (step === 1 && !formData.companySize) newErrors.companySize = 'Sélectionnez une option'
    if (step === 2 && !formData.sector) newErrors.sector = 'Sélectionnez un secteur'
    if (step === 3 && !formData.invoicesPerMonth) newErrors.invoicesPerMonth = 'Sélectionnez une option'
    if (step === 4 && !formData.currentSoftware) newErrors.currentSoftware = 'Sélectionnez une option'
    if (step === 5 && !formData.timeline) newErrors.timeline = 'Sélectionnez une échéance'
    
    if (step === 6) {
      if (!formData.firstName) newErrors.firstName = 'Prénom requis'
      if (!formData.lastName) newErrors.lastName = 'Nom requis'
      if (!formData.email) {
        newErrors.email = 'Email requis'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email invalide'
      }
      if (!formData.phone) {
        newErrors.phone = 'Téléphone requis'
      } else if (!validatePhoneNumber(formData.phone)) {
        newErrors.phone = 'Téléphone invalide'
      }
      if (!formData.companyName) newErrors.companyName = 'Nom d\'entreprise requis'
      if (!formData.siren) {
        newErrors.siren = 'SIREN requis'
      } else if (!validateSIREN(formData.siren)) {
        newErrors.siren = 'SIREN invalide (9 chiffres)'
      }
      if (!formData.ca) newErrors.ca = 'Chiffre d\'affaires requis'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    // Envoyer à Formspree
    const response = await fetch('https://formspree.io/f/mdaadbvw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        telephone: formData.phone,
        entreprise: formData.companyName,
        siren: formData.siren,
        taille: formData.companySize,
        secteur: formData.sector,
        factures_par_mois: formData.invoicesPerMonth,
        logiciel_actuel: formData.currentSoftware,
        delai: formData.timeline,
        ca: formData.ca,
        score: score,
        tier: tier,
      }),
    })

    if (response.ok) {
      // Succès !
      setShowSuccess(true)
      setFormData({
        companySize: '',
        sector: '',
        invoicesPerMonth: '',
        currentSoftware: '',
        timeline: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        siren: '',
        ca: '',
      })
    } else {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur de connexion. Veuillez réessayer.')
  } finally {
    setIsSubmitting(false)
  }
}
    >
      <div className="flex items-start gap-4">
        <div className={`
          p-3 rounded-lg
          ${selected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}
        `}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {selected && <CheckCircle2 className="h-6 w-6 text-primary-600 flex-shrink-0" />}
      </div>
    </button>
  )

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Merci !</CardTitle>
          <CardDescription className="text-lg">
            Votre demande a été envoyée avec succès
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Nos experts vont analyser votre profil et vous contacter sous <strong>24-48h</strong> avec les meilleures recommandations de plateformes agréées pour votre activité.
          </p>
          <Button onClick={onClose} className="mt-4">
            Fermer
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Trouvez Votre Plateforme Agréée</CardTitle>
            <CardDescription>Question {step} sur {totalSteps}</CardDescription>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Company Size */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary-600" />
              Quelle est la taille de votre entreprise ?
            </h3>
            <div className="grid gap-4">
              <Option
                icon={Building2}
                title="Auto-entrepreneur / Indépendant"
                description="Travailleur indépendant, freelance"
                value="auto"
                selected={formData.companySize === 'auto'}
                onClick={() => updateField('companySize', 'auto')}
              />
              <Option
                icon={Building2}
                title="TPE (1-10 salariés)"
                description="Très petite entreprise"
                value="tpe"
                selected={formData.companySize === 'tpe'}
                onClick={() => updateField('companySize', 'tpe')}
              />
              <Option
                icon={Building2}
                title="PME (10-250 salariés)"
                description="Petite et moyenne entreprise"
                value="pme"
                selected={formData.companySize === 'pme'}
                onClick={() => updateField('companySize', 'pme')}
              />
              <Option
                icon={Building2}
                title="ETI/Grande entreprise (>250 salariés)"
                description="Entreprise de taille intermédiaire ou grande entreprise"
                value="eti"
                selected={formData.companySize === 'eti'}
                onClick={() => updateField('companySize', 'eti')}
              />
            </div>
            {errors.companySize && <p className="text-sm text-red-600">{errors.companySize}</p>}
          </div>
        )}

        {/* Step 2: Sector */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Package className="h-6 w-6 text-primary-600" />
              Quel est votre secteur d'activité ?
            </h3>
            <div className="grid gap-3">
              {[
                { value: 'btp', label: 'BTP / Artisanat' },
                { value: 'commerce', label: 'Commerce / Retail' },
                { value: 'services', label: 'Services / Conseil' },
                { value: 'sante', label: 'Santé / Professions libérales' },
                { value: 'industrie', label: 'Industrie / Manufacturing' },
                { value: 'tech', label: 'Tech / Digital' },
                { value: 'autre', label: 'Autre' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('sector', option.value)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${formData.sector === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                    }
                  `}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
            {errors.sector && <p className="text-sm text-red-600">{errors.sector}</p>}
          </div>
        )}

        {/* Step 3: Invoices per month */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary-600" />
              Combien de factures émettez-vous par mois ?
            </h3>
            <div className="grid gap-3">
              {[
                { value: '0-10', label: 'Moins de 10 factures/mois' },
                { value: '10-50', label: '10 à 50 factures/mois' },
                { value: '50-200', label: '50 à 200 factures/mois' },
                { value: '200-1000', label: '200 à 1000 factures/mois' },
                { value: '1000+', label: 'Plus de 1000 factures/mois' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('invoicesPerMonth', option.value)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${formData.invoicesPerMonth === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                    }
                  `}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
            {errors.invoicesPerMonth && <p className="text-sm text-red-600">{errors.invoicesPerMonth}</p>}
          </div>
        )}

        {/* Step 4: Current Software */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Laptop className="h-6 w-6 text-primary-600" />
              Utilisez-vous déjà un logiciel de compta/facturation ?
            </h3>
            <div className="grid gap-3">
              {[
                { value: 'none', label: 'Non, tout sur Excel/papier' },
                { value: 'sage', label: 'Sage' },
                { value: 'cegid', label: 'Cegid' },
                { value: 'ebp', label: 'EBP' },
                { value: 'pennylane', label: 'Pennylane' },
                { value: 'qonto', label: 'Qonto' },
                { value: 'expert-comptable', label: 'Oui, avec mon expert-comptable' },
                { value: 'other', label: 'Autre logiciel' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('currentSoftware', option.value)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${formData.currentSoftware === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                    }
                  `}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
            {errors.currentSoftware && <p className="text-sm text-red-600">{errors.currentSoftware}</p>}
          </div>
        )}

        {/* Step 5: Timeline */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary-600" />
              Quand prévoyez-vous d'être conforme ?
            </h3>
            <div className="grid gap-3">
              {[
                { value: 'urgent', label: 'Dès que possible (urgent)', badge: '🔥 Prioritaire' },
                { value: '3-6', label: "D'ici 3-6 mois", badge: '⚡ Recommandé' },
                { value: 'sept-2026', label: 'Avant septembre 2026', badge: '📅 Deadline' },
                { value: 'unsure', label: 'Je ne sais pas', badge: '' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('timeline', option.value)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${formData.timeline === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {option.badge && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{option.badge}</span>}
                  </div>
                </button>
              ))}
            </div>
            {errors.timeline && <p className="text-sm text-red-600">{errors.timeline}</p>}
          </div>
        )}

        {/* Step 6: Contact Information */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Vos coordonnées</h3>
            <p className="text-sm text-gray-600 mb-4">
              Pour recevoir vos recommandations personnalisées et être contacté par nos experts
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Prénom *"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                error={errors.firstName}
              />
              <Input
                placeholder="Nom *"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                error={errors.lastName}
              />
            </div>

            <Input
              type="email"
              placeholder="Email professionnel *"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
            />

            <Input
              type="tel"
              placeholder="Téléphone *"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              error={errors.phone}
            />

            <Input
              placeholder="Nom de l'entreprise *"
              value={formData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              error={errors.companyName}
            />

            <Input
              placeholder="SIREN (9 chiffres) *"
              value={formData.siren}
              onChange={(e) => updateField('siren', e.target.value)}
              error={errors.siren}
              maxLength={9}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Chiffre d'affaires approximatif *</label>
              <select
                className="w-full h-12 rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                value={formData.ca}
                onChange={(e) => updateField('ca', e.target.value)}
              >
                <option value="">Sélectionnez...</option>
                <option value="0-100k">0 - 100K €</option>
                <option value="100k-500k">100K - 500K €</option>
                <option value="500k-1M">500K - 1M €</option>
                <option value="1M-10M">1M - 10M €</option>
                <option value="10M+">Plus de 10M €</option>
              </select>
              {errors.ca && <p className="text-xs text-red-600">{errors.ca}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p>🔒 Vos données sont sécurisées et ne seront utilisées que pour vous contacter avec des recommandations personnalisées.</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Suivant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer'}
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
