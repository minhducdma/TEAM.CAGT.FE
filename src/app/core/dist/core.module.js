"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CoreModule = exports.createTranslateLoader = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var auth_guard_1 = require("./guards/auth.guard");
var no_auth_guard_1 = require("./guards/no-auth.guard");
var module_import_guard_1 = require("./guards/module-import.guard");
var token_interceptor_1 = require("./interceptors/token.interceptor");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var enum_constant_1 = require("./constants/enum.constant");
var notification_1 = require("ng-zorro-antd/notification");
var ngx_cookie_service_1 = require("ngx-cookie-service");
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [http_1.HttpClient]
                    },
                    defaultLanguage: enum_constant_1.LangEnum.VI
                }),
            ],
            providers: [
                auth_guard_1.AuthGuard,
                no_auth_guard_1.NoAuthGuard,
                notification_1.NzNotificationService,
                ngx_cookie_service_1.CookieService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                },
                core_2.TranslateService
            ]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf())
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
