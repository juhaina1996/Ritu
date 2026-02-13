import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.whatsapp) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!googleScriptUrl) {
      console.error('Google Script URL not configured');
      return NextResponse.json(
        { success: false, error: 'Service not configured' },
        { status: 500 }
      );
    }

    // Prepare data for Google Apps Script
    const dataToSend = {
      type: 'brochure',
      name: body.name,
      phone: body.phone,
      whatsapp: body.whatsapp,
      phoneCountryCode: body.phoneCountryCode || '+91',
      whatsappCountryCode: body.whatsappCountryCode || '+91',
      termsAccepted: body.termsAccepted || false,
      submittedAt: new Date().toISOString()
    };

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Apps Script');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Brochure request submitted successfully',
      data: result
    });

  } catch (error) {
    console.error('Error in brochure API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
