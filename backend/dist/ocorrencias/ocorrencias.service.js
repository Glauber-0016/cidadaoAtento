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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcorrenciasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ocorrencias_entity_1 = require("./ocorrencias.entity");
const email_service_1 = require("../email//email.service");
const user_entity_1 = require("../auth/user.entity");
let OcorrenciasService = class OcorrenciasService {
    constructor(repo, userRepo, emailService) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.emailService = emailService;
    }
    async updateStatus(id, newStatus) {
        const ocorrenciaToUpdate = await this.repo.preload({
            id: parseInt(id),
            /*status: newStatus,*/
        });
        if (!ocorrenciaToUpdate) {
            throw new common_1.NotFoundException(`Ocorrência com ID "${id}" não encontrada.`);
        }
        ocorrenciaToUpdate.status = newStatus;
        await this.repo.save(ocorrenciaToUpdate);
        if (ocorrenciaToUpdate.userId) {
            const usuario = await this.userRepo.findOne({ where: { id: ocorrenciaToUpdate.userId } });
            if (usuario === null || usuario === void 0 ? void 0 : usuario.email) {
                const occurrenceName = ocorrenciaToUpdate.nome || 'Sua ocorrência';
                await this.emailService.sendStatusUpdateEmail(usuario.email, ocorrenciaToUpdate.nome, newStatus);
            }
        }
        return ocorrenciaToUpdate;
    }
    create(data) {
        const ocorrencia = this.repo.create(data);
        return this.repo.save(ocorrencia);
    }
    findAll() {
        return this.repo.find({ relations: ['likes'] });
    }
    findByUserId(userId) {
        return this.repo.find({
            where: { userId },
            order: { data_ocorrencia: 'DESC' }
        });
    }
    async findByStatus(status) {
        return this.repo.find({
            where: { status },
            order: { data_ocorrencia: 'DESC' }
        });
    }
};
exports.OcorrenciasService = OcorrenciasService;
exports.OcorrenciasService = OcorrenciasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ocorrencias_entity_1.Ocorrencias)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.MailService])
], OcorrenciasService);
//# sourceMappingURL=ocorrencias.service.js.map