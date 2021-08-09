import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from 'src/app/core/constants/enum.constant';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormUtil } from 'src/app/shared/utils/form';
import { BaseFormComponent } from '../../../base/base-form.component';
import { IKhachHang } from '../../../model/home.model';

@Component({
    selector: 'app-form-customer',
    templateUrl: './form-customer.component.html',
})
export class FormCustomerComponent extends BaseFormComponent<IKhachHang> implements OnInit {
    //url: string = UrlConstant.API.DM_VAI_TRO_KHCN;
    
    constructor(
        injector: Injector,
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        switch(this.action){
            case ActionEnum.CREATE:
                break;
            case ActionEnum.UPDATE:
                this.form = this.formBuilder.group(this.model);
                break;
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
    }
    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            hoTen: ['', Validators.required],
            ngaySinh: [null],
            gioiTinh: [null],
            diaChi: [null],
            soDienThoai: [null],
            email: [null],
            loaiKhachHang: [null]
        });
    }
}
