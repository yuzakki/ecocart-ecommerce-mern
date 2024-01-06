import nodemailer from 'nodemailer';
import fs from 'fs';
import { htmlToText } from 'html-to-text';

class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: { email: string; name: string }, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Hassan Azouzout <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(template: string, subject: string) {
    // 1) Render the HTML based on the html template
    const htmlContent = fs
      .readFileSync(`${__dirname}/email/${template}.html`, 'utf8')
      .replace('{{url}}', this.url)
      .replace('{{userName}}', this.firstName);

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlContent,
      text: htmlToText(htmlContent),
    };

    // 3) Create a transport
    await this.newTransport().sendMail(mailOptions);
  }

  // Password reset template
  async sendPasswordReset() {
    await this.send('password-reset', 'Password Reset Notification');
  }
}

export default Email;
