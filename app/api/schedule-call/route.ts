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

    // Verify captcha token
    if (!body.captchaToken) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification required' },
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

    // Send email via Sender.net if email is provided
    if (body.email) {
      try {
        const senderApiKey = process.env.SENDER_API_KEY;
        const templateId = process.env.SENDER_TEMPLATE_ID;

        if (senderApiKey && templateId) {
          // Map time slot value to label
          const timeSlotLabels: { [key: string]: string } = {
            'morning': 'Morning (9am - 12pm)',
            'afternoon': 'Afternoon (12pm - 3pm)',
            'late-afternoon': 'Late Afternoon (3pm - 6pm)',
            'evening': 'Evening (After 6pm)',
          };

          const emailPayload = {
            to: {
              email: body.email,
              name: body.name,
            },
            variables: {
              firstname: body.name,
              lastname: '',
              email: body.email,
              date: body.selectedDate,
              timeslot: timeSlotLabels[body.timeSlot] || body.timeSlot,
              phone: `${body.phoneCountryCode} ${body.phone}`,
              whatsapp: `${body.whatsappCountryCode} ${body.whatsapp}`,
            },
          };

          console.log('Sending email via Sender.net:', emailPayload);

          const emailResponse = await fetch(`https://api.sender.net/v2/message/${templateId}/send`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${senderApiKey}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(emailPayload),
          });

          if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error('Sender.net API error:', errorData);
          } else {
            const emailData = await emailResponse.json();
            console.log('Email sent successfully:', emailData);
          }
        } else {
          console.log('Sender.net not configured, skipping email');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the whole request if email fails
      }
    }

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
