"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfile = exports.RegisterDto = exports.LoginDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class LoginDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
    constructor(email, password, fullname) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
    }
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "storeName", void 0);
class GetUserProfile {
    constructor(token) {
        this.token = token;
    }
}
exports.GetUserProfile = GetUserProfile;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], GetUserProfile.prototype, "token", void 0);
//# sourceMappingURL=auth.dto.js.map