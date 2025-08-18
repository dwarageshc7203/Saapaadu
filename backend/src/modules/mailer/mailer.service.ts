// backend/src/modules/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  sendHotspotNotification(email: string, shopName: string) {
    throw new Error('Method not implemented.');
  }
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP config
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(options: { to: string; subject: string; text: string }) {
    return this.transporter.sendMail({
      from: process.env.MAIL_USER,
      ...options,
    });
  }
}
