"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var environment_1 = require("./../environments/environment");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var content_layout_component_1 = require("./layout/content-layout/content-layout.component");
var auth_layout_component_1 = require("./layout/auth-layout/auth-layout.component");
var animations_1 = require("@angular/platform-browser/animations");
var navbar_layout_component_1 = require("./layout/navbar-layout/navbar-layout.component");
var footer_layout_component_1 = require("./layout/footer-layout/footer-layout.component");
var auth_module_1 = require("./modules/auth/auth.module");
var core_module_1 = require("./core/core.module");
var shared_module_1 = require("./shared/shared.module");
var app_routing_module_1 = require("./app-routing.module");
var config_1 = require("@abp/ng.account/config");
var ng_core_1 = require("@abp/ng.core");
var locale_1 = require("@abp/ng.core/locale");
var config_2 = require("@abp/ng.identity/config");
var config_3 = require("@abp/ng.setting-management/config");
var config_4 = require("@abp/ng.tenant-management/config");
var store_1 = require("@ngxs/store");
var sidebar_layout_component_1 = require("./layout/sidebar-layout/sidebar-layout.component");
var i18n_1 = require("ng-zorro-antd/i18n");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var message_kendo_service_1 = require("./core/services/message-kendo.service");
var custom_translate_service_1 = require("./core/services/custom-translate.service");
var preload_1 = require("./preload");
var global_handler_service_1 = require("./core/config/global-handler.service");
var route_provider_1 = require("./route.provider");
var http_1 = require("@angular/common/http");
var angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                content_layout_component_1.ContentLayoutComponent,
                auth_layout_component_1.AuthLayoutComponent,
                navbar_layout_component_1.NavbarLayoutComponent,
                footer_layout_component_1.FooterLayoutComponent,
                sidebar_layout_component_1.SidebarLayoutComponent,
            ],
            imports: [
                // angular
                platform_browser_1.BrowserModule,
                // 3rd party
                auth_module_1.AuthModule,
                // core & shared
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                // app
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                angular_oauth2_oidc_1.OAuthModule.forRoot(),
                animations_1.BrowserAnimationsModule,
                config_1.AccountConfigModule.forRoot(),
                config_2.IdentityConfigModule.forRoot(),
                config_4.TenantManagementConfigModule.forRoot(),
                config_3.SettingManagementConfigModule.forRoot(),
                ng_core_1.CoreModule.forRoot({
                    environment: environment_1.environment,
                    registerLocaleFn: locale_1.registerLocale()
                }),
                store_1.NgxsModule.forRoot(),
            ],
            providers: [
                { provide: i18n_1.NZ_DATE_LOCALE, useValue: i18n_1.en_US },
                { provide: i18n_1.NZ_I18N, useValue: i18n_1.en_US },
                { provide: kendo_angular_l10n_1.MessageService, useClass: message_kendo_service_1.MessageKendoService },
                { provide: core_1.ErrorHandler, useClass: global_handler_service_1.GlobalErrorHandler },
                custom_translate_service_1.CustomTranslateService,
                preload_1.AppCustomPreloader,
                route_provider_1.APP_ROUTE_PROVIDER,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
