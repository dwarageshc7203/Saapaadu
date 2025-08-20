// backend/src/modules/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // you can also configure SMTP host/port
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(options: { to: string; subject: string; text: string }) {
    return this.transporter.sendMail({
      from: `"Saapaadu" <${process.env.MAIL_USER}>`,
      ...options,
    });
  }

  async sendHotspotNotification(email: string, shopName: string, mealName: string, price: number, area: string) {
    const subject = `🍲 New ${mealName} available near you at ${shopName}`;
    const text = `Hello!\n\nA new meal (${mealName}, ₹${price}) is available at ${shopName} in ${area}.\nHurry up before it runs out!\n\n– Saapaadu Team`;

    return this.sendMail({
      to: email,
      subject,
      text,
    });
  }
}
