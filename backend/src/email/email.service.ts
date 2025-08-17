// src/mail/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: this.configService.get('EMAIL_PORT'),
            secure: this.configService.get('EMAIL_SECURE') === 'true',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
    }

  async sendStatusUpdateEmail(to: string, occurrenceName: string, newStatus: string) {
    const info = await this.transporter.sendMail({
      from: '"Prefeitura" <no-reply@prefeitura.com>',
      to,
      subject: `Atualização sobre sua ocorrência: ${occurrenceName}`,
      text: `Olá! A ocorrência "${occurrenceName}" teve seu status atualizado para: ${newStatus}
        Para mais informações, acesse a plataforma do Cidadão Atento.
        
        Atenciosamente, 
        Equipe do Cidadão Atento`,
      html: `<p>Olá!</p>
             <p>A ocorrência <strong>${occurrenceName}</strong> teve seu status atualizado para: <strong>${newStatus}</strong></p>
             <br>
             <p>Atenciosamente,</p>
             <p>Equipe do Cidadão Atento</p>`,
    });

    console.log('E-mail enviado:', nodemailer.getTestMessageUrl(info));
  }
}