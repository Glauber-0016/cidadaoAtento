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
exports.ComentariosController = void 0;
const common_1 = require("@nestjs/common");
const comentario_service_1 = require("./comentario.service");
let ComentariosController = class ComentariosController {
    constructor(service) {
        this.service = service;
    }
    createComment(body) {
        if (!body.nome || !body.texto || !body.ocorrenciaId) {
            throw new common_1.BadRequestException('Dados do comentário incompletos.');
        }
        return this.service.create(body);
    }
    getCommentsByOccurrence(ocorrenciaId) {
        return this.service.findByOcorrenciaId(parseInt(ocorrenciaId));
    }
};
exports.ComentariosController = ComentariosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(':ocorrenciaId'),
    __param(0, (0, common_1.Param)('ocorrenciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "getCommentsByOccurrence", null);
exports.ComentariosController = ComentariosController = __decorate([
    (0, common_1.Controller)('comentarios'),
    __metadata("design:paramtypes", [comentario_service_1.ComentariosService])
], ComentariosController);
//# sourceMappingURL=comentario.controller.js.map