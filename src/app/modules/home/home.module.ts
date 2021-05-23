import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [SharedModule, HomeRoutingModule],
    exports: [],
    providers: [],
})
export class HomeModule { }