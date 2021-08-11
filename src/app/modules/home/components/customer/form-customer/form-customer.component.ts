import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from 'src/app/core/constants/enum.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormUtil } from 'src/app/shared/utils/form';
import { BaseFormComponent } from '../../../base/base-form.component';
import { IKhachHang } from '../../../model/home.model';

@Component({
    selector: 'app-form-customer',
    templateUrl: './form-customer.component.html',
})
export class FormCustomerComponent extends BaseFormComponent<IKhachHang> implements OnInit {

    url: string = UrlConstant.API.KHACH_HANG;
    
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
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(this.url, this.form.value)
                        .subscribe(res => {
                            // show notification
                            //this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService
                        .put(this.url, this.form.value)
                        .subscribe(res => {
                            // show notification
                            //this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
            }
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
