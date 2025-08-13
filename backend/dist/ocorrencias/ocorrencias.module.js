"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcorrenciasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ocorrencias_entity_1 = require("./ocorrencias.entity");
const ocorrencias_service_1 = require("./ocorrencias.service");
const ocorrencias_controller_1 = require("./ocorrencias.controller");
const user_entity_1 = require("../auth/user.entity");
const email_module_1 = require("../email/email.module");
let OcorrenciasModule = class OcorrenciasModule {
};
exports.OcorrenciasModule = OcorrenciasModule;
exports.OcorrenciasModule = OcorrenciasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ocorrencias_entity_1.Ocorrencias, user_entity_1.User]),
            email_module_1.MailModule,
        ],
        providers: [ocorrencias_service_1.OcorrenciasService],
        controllers: [ocorrencias_controller_1.OcorrenciasController],
    })
], OcorrenciasModule);
//# sourceMappingURL=ocorrencias.module.js.map