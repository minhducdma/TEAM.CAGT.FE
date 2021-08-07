import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private sub = new Subscription();


    private formBuilder: FormBuilder;
    private router: Router;
    private authService: AuthService;
    constructor(
        private injector: Injector
    ) {
        this.formBuilder = injector.get(FormBuilder);
        this.router = injector.get(Router);
        this.authService = injector.get(AuthService);
        this.createForm();
    }

    ngOnInit() { }

    private createForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const formData = this.loginForm?.value;
        if(formData.username == "admin" && formData.password == "1111")
            this.router.navigate(['/dashboard/home']);
        // this.sub = this.authService
        //     .doLogin(formData)
        //     .pipe(
        //         delay(1500),
        //         tap(() => this.router.navigate(['/dashboard/home'])),
        //         finalize(() => { }),
        //         catchError(async (error) => console.log(error))
        //     )
        //     .subscribe();
    }



    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
