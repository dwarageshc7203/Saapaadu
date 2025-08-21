// backend/src/modules/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(options: { to: string; subject: string; text: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Saapaadu" <${process.env.MAIL_USER}>`,
        ...options,
      });
      console.log("✅ Mail sent:", info.messageId, "to", options.to);
      return info;
    } catch (err) {
      console.error("❌ Mail send failed:", err.message);
      throw err;
    }
  }

  // 🔔 Add this method
  async notifyCustomersForHotspot(
    customers: any[],
    shopName: string,
    mealName: string,
    price: number,
    area: string,
  ) {
    console.log(`📩 Preparing to notify ${customers.length} customers in ${area}`);

    for (const c of customers) {
      if (!c.user?.email) continue;

      console.log("➡ Sending mail to:", c.user.email);

      await this.sendMail({
        to: c.user.email,
        subject: `New meal available near you in ${area}!`,
        text: `Hi ${c.user.username || 'Customer'}, 

A new meal hotspot is available near you!

Shop: ${shopName}
Meal: ${mealName}
Price: ₹${price}
Area: ${area}

Hurry before it’s gone! 🍴`,
      });
    }
  }
}
