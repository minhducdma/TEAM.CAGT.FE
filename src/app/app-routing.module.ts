import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

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
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'account',
      loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
    },
    {
      path: 'identity',
      loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
    },
    {
      path: 'tenant-management',
      loadChildren: () =>
        import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
    },
    {
      path: 'setting-management',
      loadChildren: () =>
        import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),

    },
    {
      path: 'testExam',
        component: ContentLayoutComponent,
        canActivate: [NoAuthGuard],
        loadChildren: () =>
            import('./modules/createTestExam/createTestExam.module').then(m => m.CreateTestExamModule)
    }
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
