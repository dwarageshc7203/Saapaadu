import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  send(@Body() dto: CreateNotificationDto) {
    return this.notificationService.sendNotification(dto);
  }

  @Get()
  inbox(@Query('email') email: string) {
    return this.notificationService.getInbox(email);
  }
}
