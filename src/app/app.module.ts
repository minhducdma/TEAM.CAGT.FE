import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NavbarLayoutComponent,
    FooterLayoutComponent,
    SidebarLayoutComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {}