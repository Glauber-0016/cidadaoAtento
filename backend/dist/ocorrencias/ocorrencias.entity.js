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
exports.Ocorrencias = void 0;
const typeorm_1 = require("typeorm");
const comentario_entity_1 = require("../comentarios/comentario.entity");
const like_entity_1 = require("../likes/like.entity");
const user_entity_1 = require("../auth/user.entity");
let Ocorrencias = class Ocorrencias {
};
exports.Ocorrencias = Ocorrencias;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ocorrencias.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Ocorrencias.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        eager: false,
        nullable: true,
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Ocorrencias.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ocorrencias.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ocorrencias.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Ocorrencias.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Ocorrencias.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ocorrencias.prototype, "imagens", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendente' }),
    __metadata("design:type", String)
], Ocorrencias.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', name: 'data_ocorrencia' }),
    __metadata("design:type", Date)
], Ocorrencias.prototype, "data_ocorrencia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comentario_entity_1.Comentario, comentario => comentario.ocorrencia),
    __metadata("design:type", Array)
], Ocorrencias.prototype, "comentarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, like => like.ocorrencia),
    __metadata("design:type", Array)
], Ocorrencias.prototype, "likes", void 0);
exports.Ocorrencias = Ocorrencias = __decorate([
    (0, typeorm_1.Entity)()
], Ocorrencias);
//# sourceMappingURL=ocorrencias.entity.js.map