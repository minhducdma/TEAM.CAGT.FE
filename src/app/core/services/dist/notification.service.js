"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationService = void 0;
var core_1 = require("@angular/core");
var app_constant_1 = require("../constants/app.constant");
var NotificationService = /** @class */ (function () {
    function NotificationService(notification) {
        this.notification = notification;
        this.option = {
            nzDuration: 3000,
            nzAnimate: true,
            nzTop: -100
        };
    }
    NotificationService.getStatusComponentInsideIframe = function () {
        // true: inside iframe, false: outside iframe
        return window !== window.top;
    };
    /**
     * Creates notification
     * @param type
     * @param title
     * @param content
     */
    NotificationService.prototype.createNotification = function (title, content) {
        this.notification.success(title, content, {
            nzDuration: 10000
        });
    };
    /**
     * Shows error message
     * @param mes
     */
    NotificationService.prototype.showSuccessMessage = function (mes) {
        this.notification.success(app_constant_1.AppConstant.TITLE, mes, this.option);
    };
    /**
     * Shows error message
     * @param mes
     */
    NotificationService.prototype.showErrorMessage = function (mes) {
        this.notification.error(app_constant_1.AppConstant.TITLE, mes, this.option);
    };
    /**
     * Shows warning message
     * @param mes
     */
    NotificationService.prototype.showWarningMessage = function (mes) {
        this.notification.warning(app_constant_1.AppConstant.TITLE, mes, this.option);
    };
    NotificationService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
