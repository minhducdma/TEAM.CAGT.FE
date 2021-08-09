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


import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
<<<<<<< HEAD
import { HhhComponent } from './layout/hhh/hhh.component';
=======
import { en_US, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MessageService } from '@progress/kendo-angular-l10n';
import { MessageKendoService } from './core/services/message-kendo.service';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { AppCustomPreloader } from './preload';
import { GlobalErrorHandler } from './core/config/global-handler.service';
>>>>>>> 8e9b6982e8582814fdbbe1f12467d08812b7decc

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NavbarLayoutComponent,
    FooterLayoutComponent,
    SidebarLayoutComponent,
    HhhComponent
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

    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_DATE_LOCALE, useValue: en_US },
    { provide: NZ_I18N, useValue: en_US },
    { provide: MessageService, useClass: MessageKendoService },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    CustomTranslateService,
    AppCustomPreloader,
],
  bootstrap: [AppComponent]
})
export class AppModule {}