// backend/src/modules/mailer/mailer.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('test')
  async sendTestMail() {
    return this.mailerService.sendMail({
      to: 'cnls2official@gmail.com',
      subject: 'Test Email from Saapaadu 🚀',
      text: 'If you see this, mailing works!',
    });
  }
}
