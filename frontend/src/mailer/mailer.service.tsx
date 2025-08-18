import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or SMTP config
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendHotspotNotification(to: string, hotspotName: string) {
    await this.transporter.sendMail({
      from: `"Saapaadu" <${process.env.MAIL_USER}>`,
      to,
      subject: `New hotspot near you: ${hotspotName}`,
      text: `Good news! A new hotspot "${hotspotName}" is now active near your location. Check the app to order!`,
    });
  }
}
