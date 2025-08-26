export const connectTemplate = (name: string, email: string, otp: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - Connect</title>
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
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.07);
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }
    .header {
      background: #22c55e; /* green-500 */
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
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
      width: 24px;
      height: 24px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #1f2937;
    }
    .otp-container {
      background: #f1f5f9;
      border: 2px solid #22c55e;
      border-radius: 8px;
      padding: 25px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-label {
      color: #4b5563;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .otp-code {
      font-size: 32px;
      font-weight: bold;
      color: #22c55e;
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
      margin: 10px 0;
    }
    .instructions {
      background: #f9fafb;
      border-left: 4px solid #22c55e;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .instructions h3 {
      margin-top: 0;
      color: #1f2937;
      font-size: 16px;
    }
    .instructions li {
      margin: 8px 0;
      color: #374151;
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
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #22c55e;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <!-- Chat bubble icon -->
        <svg class="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 0 0-2.54-3.8 199.81 199.81 0 0 1-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 0 1 4.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 0 0-11.12-2.07 30.71 30.71 0 0 0-12.09 2.43l-67.83 24.48a16 16 0 0 1-4.67 1.22 9.6 9.6 0 0 1-9.57-9.74 15.85 15.85 0 0 1 .6-3.29z"></path>
        </svg>
        Connect
      </div>
      <h1>Password Reset</h1>
    </div>

    <div class="content">
      <div class="greeting">
        Hey ${name} 👋,
      </div>

      <p>We received a request to reset the password for your Connect account (<strong>${email}</strong>).</p>

      <div class="otp-container">
        <div class="otp-label">Your reset code</div>
        <div class="otp-code">${otp}</div>
        <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
          This code will expire in 10 minutes.
        </p>
      </div>

      <div class="instructions">
        <h3>How to reset:</h3>
        <ul>
          <li>Copy the code above</li>
          <li>Paste it on the reset page in the app</li>
          <li>Set your new password</li>
        </ul>
      </div>

      <div class="warning">
        ⚠️ Didn’t request this reset? Just ignore this email — your account stays safe unless the code is used.
      </div>

      <p>If you need help, reach out to our support team anytime.</p>

      <p style="margin-top: 30px;">
        Cheers,<br>
        <strong>The Connect Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>Sent to ${email}</p>
      <p style="margin-top: 15px;">
        © 2025 Connect. All rights reserved.<br>
        <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}
