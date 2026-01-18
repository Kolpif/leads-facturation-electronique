import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { siren } = await request.json()

    if (!siren || !/^\d{9}$/.test(siren)) {
      return NextResponse.json(
        { error: 'SIREN invalide' },
        { status: 400 }
      )
    }

    // Call INSEE API to validate SIREN
    // Note: In production, you would use the actual INSEE API
    // For now, we'll do a basic Luhn check
    
    const isValid = validateSIRENLuhn(siren)

    if (!isValid) {
      return NextResponse.json(
        { error: 'SIREN invalide (échec de validation)' },
        { status: 400 }
      )
    }

    // In production, fetch company data from INSEE API:
    // const response = await fetch(`https://api.insee.fr/entreprises/sirene/V3/siren/${siren}`, {
    //   headers: { 'Authorization': `Bearer ${process.env.INSEE_API_KEY}` }
    // })

    return NextResponse.json({
      valid: true,
      siren,
      // In production, return company data from INSEE
      // company: data
    })

  } catch (error) {
    console.error('SIREN validation error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

function validateSIRENLuhn(siren: string): boolean {
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(siren[i])
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}
