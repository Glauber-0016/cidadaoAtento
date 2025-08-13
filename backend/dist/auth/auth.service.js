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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(username, password, cpf, email) {
        const existing = await this.userRepo.findOne({ where: { username } });
        if (existing)
            throw new Error('Usuário já existe');
        const existing1 = await this.userRepo.findOne({ where: { cpf } });
        if (existing1)
            throw new Error('cpf já existe');
        const existing2 = await this.userRepo.findOne({ where: { email } });
        if (existing2)
            throw new Error('email já existe');
        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, password: hash, cpf, email });
        return this.userRepo.save(user);
    }
    async login(username, password) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user)
            throw new Error('Usuário não encontrado');
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new Error('Senha inválida');
        return { message: 'Login bem-sucedido', userId: user.id, email: user.email };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map