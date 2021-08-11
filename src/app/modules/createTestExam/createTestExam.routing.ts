import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'createTest',
        pathMatch: 'full'
    },
    {
        path: 'createTest',
        component: CreateTestComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateTestExamRoutingModule { }