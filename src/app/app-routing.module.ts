import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { TaoDeThiModule } from './modules/taoDeThi/taoDeThi.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContentLayoutComponent,
        canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./modules/home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    {
        path: '',
        component: ContentLayoutComponent,
        canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
        children: [
            {
                path: 'taoDeThi',
                loadChildren: () =>
                    import('./modules/taoDeThi/taoDeThi.module').then(m => m.TaoDeThiModule)
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    // Fallback when no prior routes is matched
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }