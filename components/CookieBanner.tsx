'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ConsentState = 'accepted' | 'declined' | null

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('cookie-consent') as ConsentState
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored)
    }
    setIsReady(true)
  }, [])

  const handleChoice = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem('cookie-consent', value)
    setConsent(value)
  }

  if (!isReady || consent) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-gray-900/95 text-gray-100 border-t border-gray-800">
      <div className="container-custom py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed">
          Nous utilisons des cookies pour mesurer l'audience (Google Analytics) et améliorer nos campagnes (Google Ads).
          Vous pouvez accepter ou refuser.{' '}
          <Link href="/cookies" className="text-primary-300 hover:underline">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="sm" onClick={() => handleChoice('accepted')}>
            Accepter
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleChoice('declined')}>
            Refuser
          </Button>
        </div>
      </div>
    </div>
  )
}
