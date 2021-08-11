"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var no_auth_guard_1 = require("./core/guards/no-auth.guard");
var auth_layout_component_1 = require("./layout/auth-layout/auth-layout.component");
var content_layout_component_1 = require("./layout/content-layout/content-layout.component");
var routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: content_layout_component_1.ContentLayoutComponent,
        canActivate: [no_auth_guard_1.NoAuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./modules/home/home.module'); }).then(function (m) { return m.HomeModule; });
                }
            }
        ]
    },
    {
        path: 'auth',
        component: auth_layout_component_1.AuthLayoutComponent,
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/auth/auth.module'); }).then(function (m) { return m.AuthModule; });
        }
    },
    {
        path: 'account',
        loadChildren: function () { return Promise.resolve().then(function () { return require('@abp/ng.account'); }).then(function (m) { return m.AccountModule.forLazy(); }); }
    },
    {
        path: 'identity',
        loadChildren: function () { return Promise.resolve().then(function () { return require('@abp/ng.identity'); }).then(function (m) { return m.IdentityModule.forLazy(); }); }
    },
    {
        path: 'tenant-management',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('@abp/ng.tenant-management'); }).then(function (m) { return m.TenantManagementModule.forLazy(); });
        }
    },
    {
        path: 'setting-management',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('@abp/ng.setting-management'); }).then(function (m) { return m.SettingManagementModule.forLazy(); });
        }
    },
    {
        path: 'testExam',
        component: content_layout_component_1.ContentLayoutComponent,
        canActivate: [no_auth_guard_1.NoAuthGuard],
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/createTestExam/createTestExam.module'); }).then(function (m) { return m.CreateTestExamModule; });
        }
    },
    // Fallback when no prior routes is matched
    {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [router_1.RouterModule],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
