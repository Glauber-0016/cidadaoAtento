// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'abbey45@ethereal.email',
        pass: 'vy2cHM6X56j2mH8CNf',
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