interface IEmailOtpRegisterTemplate {
  message: string;
  recipient: string;
  codeOtp: string;
}

export const sendOtpEmailTampalte = ({ message, recipient, codeOtp }: IEmailOtpRegisterTemplate) => `
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            h1 {
                color: #007BFF;
            }
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ${recipient},</h1>
            <p>${message}</p>
            <p class="otp-code">Your OTP Code: ${codeOtp}</p>
            <p>Please use this code to complete your registration. This code is valid for 5 minutes, so make sure to use it as soon as possible.</p>
            <p>Thank you for registering!</p>
        </div>
    </body>
    </html>
`;
