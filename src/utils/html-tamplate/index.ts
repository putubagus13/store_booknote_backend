interface IEmailOtpRegisterTemplate {
  message: string;
  recipient: string;
  codeOtp: string;
}

interface IEmailResetPasswordTemplate {
  recipient: string;
  token: string;
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

export const sendEmailResetPasswordTemplate = ({ recipient, token }: IEmailResetPasswordTemplate) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
        />
        <title>Your Request Reset Password</title>
        <style>
        body {
            font-family: "Inter", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            width: 100%;
            height: 100vh;
            color: black;
        }
        </style>
    </head>
    <body>
        <h2>Request Reset password</h2>
        <p>
        Hi <span style="font-weight: 600">${recipient}</span>! For reset your password
        please click the button below!
        </p>
        <a
        href="http://localhost:4000/auth/reset-password?token=${token}"
        style="
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        "
        >Reset Password</a
        >
    </body>
    </html>
`;
