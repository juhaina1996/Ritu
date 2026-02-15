/**
 * Google Apps Script for handling form submissions
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into the script editor
 * 4. Update the ADMIN_EMAIL constant below
 * 5. Deploy as Web App (Deploy > New deployment > Web app)
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 7. Copy the deployment URL and add it to your .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

// ============= CONFIGURATION =============
const ADMIN_EMAIL = 'szdevelopers72@gmail.com'; // UPDATE THIS WITH YOUR ADMIN EMAIL
const SHEET_NAME_BROCHURE = 'Brochure Downloads';
const SHEET_NAME_SCHEDULE = 'Schedule Calls';

// Sender.net Configuration (for sending emails to users)
const SENDER_API_KEY = 'YOUR_SENDER_NET_API_KEY'; // Get from Sender.net dashboard
const SENDER_FROM_EMAIL = 'noreply@yourdomain.com'; // Your verified sender email
const SENDER_FROM_NAME = 'Ritu Investment Team'; // Sender name
const SENDER_API_URL = 'https://api.sender.net/v2/email';

// ============= MAIN HANDLER =============
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type;
    
    let result;
    if (type === 'brochure') {
      result = handleBrochureSubmission(data);
    } else if (type === 'schedule') {
      result = handleScheduleSubmission(data);
    } else {
      throw new Error('Invalid submission type');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============= BROCHURE DOWNLOAD HANDLER =============
function handleBrochureSubmission(data) {
  // Save to Google Sheet
  saveToSheet(SHEET_NAME_BROCHURE, [
    new Date(),
    data.name,
    "'" + data.phoneCountryCode + ' ' + data.phone,  // Add ' to prevent formula error
    "'" + data.whatsappCountryCode + ' ' + data.whatsapp,  // Add ' to prevent formula error
    data.termsAccepted ? 'Yes' : 'No'
  ]);
  
  // Send email to admin
  sendBrochureEmailToAdmin(data);
  
  return { success: true, message: 'Brochure request processed' };
}

// ============= SCHEDULE CALL HANDLER =============
function handleScheduleSubmission(data) {
  // Save to Google Sheet
  saveToSheet(SHEET_NAME_SCHEDULE, [
    new Date(),
    data.name,
    data.email || 'N/A',
    "'" + data.phoneCountryCode + ' ' + data.phone,  // Add ' to prevent formula error
    "'" + data.whatsappCountryCode + ' ' + data.whatsapp,  // Add ' to prevent formula error
    data.selectedDate,
    data.timeSlot,
    data.termsAccepted ? 'Yes' : 'No'
  ]);
  
  // Send email to admin
  sendScheduleEmailToAdmin(data);
  
  // Send confirmation email to user (if email provided)
  if (data.email) {
    sendScheduleConfirmationToUser(data);
  }
  
  return { success: true, message: 'Schedule call request processed' };
}

// ============= GOOGLE SHEETS FUNCTIONS =============
function saveToSheet(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    // Add headers based on sheet type
    if (sheetName === SHEET_NAME_BROCHURE) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'WhatsApp', 'Terms Accepted']);
    } else if (sheetName === SHEET_NAME_SCHEDULE) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'WhatsApp', 'Date', 'Time Slot', 'Terms Accepted']);
    }
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  // Append the data
  sheet.appendRow(rowData);
}

// ============= EMAIL FUNCTIONS =============
function sendBrochureEmailToAdmin(data) {
  const subject = '📥 New Brochure Download Request';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Arsenal:wght@100;400&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0;padding:0;background:#f7f5f2;font-family:'Arsenal',sans-serif">
      <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e0e0e0">
        
        <!-- Header -->
        <div style="background:#413529;padding:30px;text-align:center">
          <h1 style="margin:0;font-size:24px;font-weight:100;color:#fff;letter-spacing:1px">NEW BROCHURE REQUEST</h1>
        </div>
        
        <!-- Content -->
        <div style="padding:40px 30px">
          <p style="margin:0 0 30px;font-size:16px;color:#413529;line-height:1.6">
            A new user has requested to download the brochure. Here are their details:
          </p>
          
          <table style="width:100%;border-collapse:collapse;margin-bottom:30px">
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484;width:120px">Name</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484">Phone</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.phoneCountryCode} ${data.phone}</td>
            </tr>
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484">WhatsApp</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.whatsappCountryCode} ${data.whatsapp}</td>
            </tr>
            <tr>
              <td style="padding:15px 0;font-size:14px;color:#868484">Submitted</td>
              <td style="padding:15px 0;font-size:14px;color:#868484">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
        </div>
        
        <!-- Footer -->
        <div style="background:#f7f5f2;padding:20px 30px;text-align:center;border-top:1px solid #e0e0e0">
          <p style="margin:0;font-size:12px;color:#868484;font-weight:100">
            Automated notification from your website
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendScheduleEmailToAdmin(data) {
  const subject = '📞 New Call Schedule Request';
  
  const timeSlotLabels = {
    'morning': 'Morning (9am - 12pm)',
    'afternoon': 'Afternoon (12pm - 3pm)',
    'late-afternoon': 'Late Afternoon (3pm - 6pm)',
    'evening': 'Evening (After 6pm)'
  };
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Arsenal:wght@100;400&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0;padding:0;background:#f7f5f2;font-family:'Arsenal',sans-serif">
      <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e0e0e0">
        
        <!-- Header -->
        <div style="background:#1a6a6d;padding:30px;text-align:center">
          <h1 style="margin:0;font-size:24px;font-weight:100;color:#fff;letter-spacing:1px">NEW CALL REQUEST</h1>
        </div>
        
        <!-- Content -->
        <div style="padding:40px 30px">
          <p style="margin:0 0 30px;font-size:16px;color:#413529;line-height:1.6">
            A new user has requested to schedule a call. Here are the appointment details:
          </p>
          
          <table style="width:100%;border-collapse:collapse;margin-bottom:30px">
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484;width:120px">Name</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.name}</td>
            </tr>
            ${data.email ? `<tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484">Email</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.email}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484">Phone</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.phoneCountryCode} ${data.phone}</td>
            </tr>
            <tr>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#868484">WhatsApp</td>
              <td style="padding:15px 0;border-bottom:1px solid #f0f0f0;font-size:16px;color:#413529">${data.whatsappCountryCode} ${data.whatsapp}</td>
            </tr>
          </table>
          
          <!-- Appointment Details -->
          <div style="background:#f7f5f2;padding:25px;margin-bottom:20px;border-left:3px solid #1a6a6d">
            <p style="margin:0 0 15px;font-size:14px;color:#868484;text-transform:uppercase;letter-spacing:1px">Appointment Details</p>
            <p style="margin:0 0 10px;font-size:18px;color:#413529;font-weight:400">${data.selectedDate}</p>
            <p style="margin:0;font-size:16px;color:#868484">${timeSlotLabels[data.timeSlot] || data.timeSlot}</p>
          </div>
          
          <p style="margin:0;font-size:14px;color:#868484">
            Submitted at ${new Date().toLocaleString()}
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background:#f7f5f2;padding:20px 30px;text-align:center;border-top:1px solid #e0e0e0">
          <p style="margin:0;font-size:12px;color:#868484;font-weight:100">
            Automated notification from your website
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendScheduleConfirmationToUser(data) {
  const subject = 'Your Ritu Investment Call is Scheduled';
  
  const timeSlotLabels = {
    'morning': 'Morning (9am - 12pm)',
    'afternoon': 'Afternoon (12pm - 3pm)',
    'late-afternoon': 'Late Afternoon (3pm - 6pm)',
    'evening': 'Evening (After 6pm)'
  };
  
  // Extract first name from full name
  const firstName = data.name.split(' ')[0];
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Arsenal:wght@100;400&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0;padding:0;background:#f7f5f2;font-family:'Arsenal',sans-serif">
      <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e0e0e0">
        
        <!-- Header -->
        <div style="background:#1a6a6d;padding:40px 30px;text-align:center">
          <h1 style="margin:0 0 10px;font-size:32px;font-weight:100;color:#fff;letter-spacing:2px">THANK YOU</h1>
          <p style="margin:0;font-size:16px;color:#fff;opacity:0.9;font-weight:100">Your call with us has been scheduled</p>
        </div>
        
        <!-- Content -->
        <div style="padding:40px 30px">
          <p style="margin:0 0 10px;font-size:18px;color:#413529">Dear ${firstName},</p>
          <p style="margin:0 0 30px;font-size:16px;color:#868484;line-height:1.6;font-weight:100">
            Thank you for your interest in <strong style="color:#413529">Ritu – A Luxury Farm Resort</strong>. Our investment advisor will connect with you on:
          </p>
          
          <!-- Appointment Card -->
          <div style="background:#f7f5f2;padding:30px;margin-bottom:30px;border-left:4px solid #1a6a6d">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;font-size:14px;color:#868484;width:140px">Date</td>
                <td style="padding:8px 0;font-size:18px;color:#413529;font-weight:400">${data.selectedDate}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:14px;color:#868484">Time</td>
                <td style="padding:8px 0;font-size:18px;color:#1a6a6d">${timeSlotLabels[data.timeSlot] || data.timeSlot}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:14px;color:#868484">Contact Number</td>
                <td style="padding:8px 0;font-size:16px;color:#413529">${data.phoneCountryCode} ${data.phone}</td>
              </tr>
            </table>
          </div>
          
          <p style="margin:0 0 30px;font-size:15px;color:#868484;line-height:1.6;font-weight:100">
            We look forward to introducing you to the vision, ownership model, and opportunity behind Ritu.
          </p>
          
          <p style="margin:0 0 30px;font-size:15px;color:#868484;line-height:1.6;font-weight:100">
            Should you need to reschedule or have any questions beforehand, please feel free to reach out by replying to this email.
          </p>
          
          <p style="margin:0 0 5px;font-size:16px;color:#413529;font-weight:100">
            Warm regards,
          </p>
          <p style="margin:0 0 5px;font-size:16px;color:#413529;font-weight:400">
            Investor Relations
          </p>
          <p style="margin:0 0 20px;font-size:16px;color:#413529;font-weight:400">
            SZ Developers
          </p>
          
          <!-- Logo -->
          <div style="margin-top:20px">
            <img src="https://your-domain.com/images/logoMain.svg" alt="SZ Developers" style="height:40px;width:auto" />
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background:#f7f5f2;padding:20px 30px;text-align:center;border-top:1px solid #e0e0e0">
          <p style="margin:0;font-size:12px;color:#868484;font-weight:100">
            This is an automated confirmation. You can reply to this email for any queries.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
  
  // Send via Sender.net API
  sendEmailViaSenderNet(data.email, subject, htmlBody);
}

// ============= SENDER.NET EMAIL FUNCTION =============
function sendEmailViaSenderNet(toEmail, subject, htmlBody) {
  try {
    const payload = {
      from: {
        email: SENDER_FROM_EMAIL,
        name: SENDER_FROM_NAME
      },
      to: [
        {
          email: toEmail
        }
      ],
      subject: subject,
      html: htmlBody,
      reply_to: {
        email: ADMIN_EMAIL,
        name: 'Investor Relations'
      }
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + SENDER_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(SENDER_API_URL, options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();
    
    if (responseCode === 200 || responseCode === 201) {
      Logger.log('Email sent successfully via Sender.net to: ' + toEmail);
      return { success: true };
    } else {
      Logger.log('Failed to send email via Sender.net. Status: ' + responseCode + ', Response: ' + responseBody);
      return { success: false, error: responseBody };
    }
  } catch (error) {
    Logger.log('Error sending email via Sender.net: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

// ============= TEST FUNCTIONS =============
// You can run these from the Apps Script editor to test
function testBrochureSubmission() {
  const testData = {
    type: 'brochure',
    name: 'Test User',
    phone: '1234567890',
    whatsapp: '1234567890',
    phoneCountryCode: '+91',
    whatsappCountryCode: '+91',
    termsAccepted: true
  };
  
  const result = handleBrochureSubmission(testData);
  Logger.log(result);
}

function testScheduleSubmission() {
  const testData = {
    type: 'schedule',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    whatsapp: '1234567890',
    phoneCountryCode: '+91',
    whatsappCountryCode: '+91',
    selectedDate: '15 February 2026',
    timeSlot: 'morning',
    termsAccepted: true
  };
  
  const result = handleScheduleSubmission(testData);
  Logger.log(result);
}
