import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.whatsapp || !body.selectedDate || !body.timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification required' },
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
      type: 'schedule',
      name: body.name,
      email: body.email || '',
      phone: body.phone,
      whatsapp: body.whatsapp,
      phoneCountryCode: body.phoneCountryCode || '+91',
      whatsappCountryCode: body.whatsappCountryCode || '+91',
      selectedDate: body.selectedDate,
      timeSlot: body.timeSlot,
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
      message: 'Call scheduled successfully',
      data: result
    });

  } catch (error) {
    console.error('Error in schedule-call API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
