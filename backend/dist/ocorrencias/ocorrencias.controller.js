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
exports.OcorrenciasController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const ocorrencias_service_1 = require("./ocorrencias.service");
const multer_1 = require("multer");
const path_1 = require("path");
let OcorrenciasController = class OcorrenciasController {
    constructor(service) {
        this.service = service;
    }
    async updateOccurrenceStatus(id, body) {
        try {
            const updatedOccurrence = await this.service.updateStatus(id, body.status);
            return updatedOccurrence;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    create(files, data) {
        const fileNames = (files === null || files === void 0 ? void 0 : files.map(file => file.filename)) || [];
        return this.service.create(Object.assign(Object.assign({}, data), { imagens: fileNames.join(',') }));
    }
    findAll() {
        return this.service.findAll();
    }
    findByStatus(status) {
        return this.service.findByStatus(status);
    }
    findOccurrencesByUser(userId) {
        return this.service.findByUserId(parseInt(userId, 10));
    }
};
exports.OcorrenciasController = OcorrenciasController;
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OcorrenciasController.prototype, "updateOccurrenceStatus", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('imagens', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], OcorrenciasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OcorrenciasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OcorrenciasController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OcorrenciasController.prototype, "findOccurrencesByUser", null);
exports.OcorrenciasController = OcorrenciasController = __decorate([
    (0, common_1.Controller)('ocorrencias'),
    __metadata("design:paramtypes", [ocorrencias_service_1.OcorrenciasService])
], OcorrenciasController);
//# sourceMappingURL=ocorrencias.controller.js.map