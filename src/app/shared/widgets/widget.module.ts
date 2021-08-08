import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { IframeContentComponent } from './iframe-content/iframe-content.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LayoutModule } from '@progress/kendo-angular-layout';

const AllComponents = [
    //IframeContentComponent,
];
@NgModule({
    declarations: [AllComponents],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzModalModule,
        NzTreeSelectModule,
        NzSelectModule,
        NzSpinModule,
        LayoutModule,
        TreeViewModule,
        GridModule,
        DialogsModule,
        TranslateModule,
        NgxSpinnerModule,
    ],
    exports: [AllComponents],
    providers: [NzModalService, NgxSpinnerService],
})
export class WidgetModule { }
