import { Module } from '@nestjs/common';
import { MailService } from '../email/email.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
