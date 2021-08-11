import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarLayoutComponent } from './layout/navbar-layout/navbar-layout.component';
import { FooterLayoutComponent } from './layout/footer-layout/footer-layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule as CoreModuleAbp } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { NgxsModule } from '@ngxs/store';

import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { en_US, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MessageService } from '@progress/kendo-angular-l10n';
import { MessageKendoService } from './core/services/message-kendo.service';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { AppCustomPreloader } from './preload';
import { GlobalErrorHandler } from './core/config/global-handler.service';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NavbarLayoutComponent,
    FooterLayoutComponent,
    SidebarLayoutComponent,

  ],
  imports: [
    // angular
    BrowserModule,

    // 3rd party
    AuthModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    CoreModuleAbp.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    NgxsModule.forRoot(),

  ],
  providers: [
    { provide: NZ_DATE_LOCALE, useValue: en_US },
    { provide: NZ_I18N, useValue: en_US },
    { provide: MessageService, useClass: MessageKendoService },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    CustomTranslateService,
    AppCustomPreloader,
    APP_ROUTE_PROVIDER,

],
  bootstrap: [AppComponent]
})
export class AppModule {}
