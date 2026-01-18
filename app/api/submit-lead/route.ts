import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const leadData = await request.json()

    // Validate required fields
    const requiredFields = [
      'companySize',
      'sector',
      'invoicesPerMonth',
      'currentSoftware',
      'timeline',
      'firstName',
      'lastName',
      'email',
      'phone',
      'companyName',
      'siren',
      'ca'
    ]

    for (const field of requiredFields) {
      if (!leadData[field]) {
        return NextResponse.json(
          { error: `Champ requis manquant: ${field}` },
          { status: 400 }
        )
      }
    }

    // Add metadata
    const lead = {
      ...leadData,
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      source: 'website',
      status: 'new'
    }

    // Calculate lead score (Bronze, Silver, Gold, Platinum)
    let score = 0
    
    // Company size scoring
    if (lead.companySize === 'eti') score += 40
    else if (lead.companySize === 'pme') score += 30
    else if (lead.companySize === 'tpe') score += 20
    else score += 10

    // Timeline urgency scoring
    if (lead.timeline === 'urgent') score += 30
    else if (lead.timeline === '3-6') score += 20
    else if (lead.timeline === 'sept-2026') score += 10

    // Invoice volume scoring
    if (lead.invoicesPerMonth === '1000+') score += 20
    else if (lead.invoicesPerMonth === '200-1000') score += 15
    else if (lead.invoicesPerMonth === '50-200') score += 10
    else if (lead.invoicesPerMonth === '10-50') score += 5

    // CA scoring
    if (lead.ca === '10M+') score += 10
    else if (lead.ca === '1M-10M') score += 7
    else if (lead.ca === '500k-1M') score += 5

    // Assign tier based on score
    let tier = 'Bronze'
    let estimatedValue = 30
    
    if (score >= 80) {
      tier = 'Platinum'
      estimatedValue = 180
    } else if (score >= 60) {
      tier = 'Gold'
      estimatedValue = 110
    } else if (score >= 40) {
      tier = 'Silver'
      estimatedValue = 65
    }

    lead.score = score
    lead.tier = tier
    lead.estimatedValue = estimatedValue

    // Save to file (in production, save to database)
    const dataDir = path.join(process.cwd(), 'data')
    const leadsFile = path.join(dataDir, 'leads.json')

    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }

    // Read existing leads or create empty array
    let leads = []
    if (existsSync(leadsFile)) {
      const fileContent = await readFile(leadsFile, 'utf-8')
      leads = JSON.parse(fileContent)
    }

    // Add new lead
    leads.push(lead)

    // Write back to file
    await writeFile(leadsFile, JSON.stringify(leads, null, 2))

    // In production, you would also:
    // - Send email notification to sales team
    // - Send confirmation email to lead
    // - Add to CRM (Salesforce, HubSpot, etc.)
    // - Trigger webhook to partner PDPs

    console.log('✅ New lead saved:', {
      id: lead.id,
      company: lead.companyName,
      tier: lead.tier,
      score: lead.score,
      estimatedValue: `${lead.estimatedValue}€`
    })

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      tier: lead.tier,
      message: 'Lead enregistré avec succès'
    })

  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
