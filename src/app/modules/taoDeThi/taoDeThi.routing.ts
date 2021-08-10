import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaoDeThiComponent } from './components/taoDeThi/taoDeThi.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'taoDeThiMoi',
        pathMatch: 'full'
    },
    {
        path: 'taoDeThiMoi',
        component: TaoDeThiComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaoDeThiRoutingModule { }