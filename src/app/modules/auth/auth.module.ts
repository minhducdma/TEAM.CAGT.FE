import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    providers: [CookieService],

    imports: [
        AuthRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }