import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CagtSelectComponent } from './cagt-select.component';

@NgModule({
    declarations: [CagtSelectComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NgxSpinnerModule],
    exports: [CagtSelectComponent],
    providers: [NgxSpinnerService],
})

export class CagtSelectModule {}