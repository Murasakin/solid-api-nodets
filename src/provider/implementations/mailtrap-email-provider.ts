import Mail from 'nodemailer/lib/mailer';
import { EmailMessage, EmailProvider } from '../email-provider';
import nodemailer from 'nodemailer';

export class MailTrapEmailProvider implements EmailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '273e7c2ae1450b',
        pass: '23c7b3fb4993aa',
      },
    });
  }

  async sendMail(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
