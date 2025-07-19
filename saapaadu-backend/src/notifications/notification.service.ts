import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailService } from 'src/common/email.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    private emailService: EmailService,
  ) {}

  async sendNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepo.create(dto);
    return this.notificationRepo.save(notification);
  }

  async getInbox(email: string): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { recipient_email: email },
      order: { created_at: 'DESC' },
    });
  }

  async create(dto: CreateNotificationDto): Promise<Notification> {
  const notification = this.notificationRepo.create(dto);
  const saved = await this.notificationRepo.save(notification);

  await this.emailService.sendMail(dto.recipient_email, dto.subject, dto.message);

  return saved;
}

}
