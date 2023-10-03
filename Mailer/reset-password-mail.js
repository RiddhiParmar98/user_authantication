import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()
export const sendEmail = async (email, resetLink) => {
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <title>Reset your password</title>
</head>
<body>
  <h1>Reset your password</h1>
  <p>To reset your password, please click on the following link:</p>
  <a href="{{resetLink}}">{{resetLink}}</a>
  <p>This link will expire in 24 hours.</p>
  <p>If you have any questions, please contact us at support@example.com.</p>
</body>
</html>
`;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Reset your password",
            html: htmlTemplate.replace("{{resetLink}}", resetLink)
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log('error', error)
    }
};