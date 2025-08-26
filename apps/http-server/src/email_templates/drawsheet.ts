export const drawsheetTemplate = (name: string, email: string, otp: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Drawsheet</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8f9fa; /* light neutral */
    }
    .container {
      background: #ffffff; /* white container for email safety */
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      overflow: hidden;
      border: 1px solid #e5e7eb; /* subtle zinc border */
    }
    .header {
      background: #1e293b; /* slate-800, dark but not pure black */
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #1f2937; /* gray-800 */
    }
    .otp-container {
      background: #f1f5f9; /* slate-100 */
      border: 2px solid #3b82f6; /* blue-500 */
      border-radius: 8px;
      padding: 25px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-code {
      font-size: 32px;
      font-weight: bold;
      color: #3b82f6; /* blue-500 */
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
      margin: 10px 0;
    }
    .otp-label {
      color: #4b5563; /* gray-600 */
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .instructions {
      background: #f9fafb; /* gray-50 */
      border-left: 4px solid #3b82f6; /* blue-500 */
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .instructions h3 {
      margin-top: 0;
      color: #1f2937; /* gray-800 */
      font-size: 16px;
    }
    .instructions li {
      margin: 8px 0;
      color: #374151; /* gray-700 */
    }
    .warning {
      background: #fff5f5;
      border: 1px solid #fecaca;
      color: #b91c1c;
      padding: 15px;
      border-radius: 8px;
      margin: 25px 0;
      font-size: 14px;
    }
    .footer {
      background: #f9fafb;
      padding: 25px 30px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280; /* gray-500 */
      font-size: 14px;
    }
    .footer a {
      color: #3b82f6; /* blue-500 */
      text-decoration: none;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 22px;
      font-weight: bold;
    }
    .icon {
      width: 22px;
      height: 22px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <!-- Pencil Icon in Tailwind Blue-500 -->
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path fill="#3B82F6" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"/>
          </g>
        </svg>
        Drawsheet
      </div>
      <h1>Password Reset</h1>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hi ${name} 👋,
      </div>
      
      <p>We got a request to reset the password for your Drawsheet account (<strong>${email}</strong>).</p>
      
      <div class="otp-container">
        <div class="otp-label">Your code</div>
        <div class="otp-code">${otp}</div>
        <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
          This code will expire in 10 minutes
        </p>
      </div>
      
      <div class="instructions">
        <h3>Next steps:</h3>
        <ul>
          <li>Copy the code above</li>
          <li>Paste it on the password reset page</li>
          <li>Choose a new password and confirm it</li>
        </ul>
      </div>
      
      <div class="warning">
        ⚠️ Didn’t request this? No worries — just ignore this email. Your account stays safe unless the code is used.
      </div>
      
      <p>If you run into any issues, reach out to our support team — we’re happy to help!</p>
      
      <p style="margin-top: 30px;">
        Cheers,<br>
        <strong>The Drawsheet Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>
        Sent to ${email}<br>
      </p>
      <p style="margin-top: 15px;">
        © 2025 Drawsheet. All rights reserved.<br>
        <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}