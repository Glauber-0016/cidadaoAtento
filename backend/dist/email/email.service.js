"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
// src/mail/mail.service.ts
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        console.log('EMAIL_HOST from .env:', this.configService.get('EMAIL_HOST'));
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
    async sendStatusUpdateEmail(to, occurrenceName, newStatus) {
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=email.service.js.map