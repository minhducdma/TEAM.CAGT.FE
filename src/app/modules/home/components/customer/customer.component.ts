import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ModalDeleteConfig, PageConfig } from 'src/app/core/constants/app.constant';
import { ActionEnum } from 'src/app/core/constants/enum.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { IPagedResult } from 'src/app/shared/models/response-data.model';
import { BaseListComponent } from '../../base/base-list.component';
import { IKhachHang } from '../../model/home.model';
import { CustomerDataExample } from './example-data';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent extends BaseListComponent<IKhachHang> implements OnInit {
    public gridData: GridDataResult;
    url: string = UrlConstant.API.KHACH_HANG;

    queryOption = {
        filter: null,
        trangThaiKhachHangs: null,
        loaiKhachHangs: null,
        nguonKhachHangs: null,
        nguoiPhuTrachs: null,
        sapXep: null,
        thoiGianTu: 1,
        thoiGianDen: 1,
    }

    constructor(
        injector: Injector,
        public api: ApiService,
        private authService: AuthService,
        private modal: NzModalService,
    ) {
        super(injector)
    }

    listDMLoaiKH = [];
    listDMNhanVienPhuTrach = [];

    ngOnInit(){
        super.ngOnInit();
        this.getDanhMucLoaiKH();
        this.getDanhMucNVPhuTrach();
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HOME.CUS.CAP_NHAT'),
            content: FormCustomerComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }
    protected loadItems() {
        this.apiService.get(UrlConstant.API.KHACH_HANG, {}).subscribe((res:any)=>{
            if(res != null && res.items.length > 0){
                this.gridData = {
                    data: res.items,
                    total: res.totalCount,
                }
            }else{
                this.gridData = {
                    data: [],
                    total: 0,
                }
            }
        })
    }
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                id: this.selectionIds[0]
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(this.url)
                        .subscribe(res => {
                            this.selectionIds = [];
                            this.loadItems();
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => { },
            });
        }
    }
    editHandler(dataItem) {
        this.action = ActionEnum.UPDATE;
        this.model = dataItem;
        this.showFormCreateOrUpdate();
    }
    onExportExcel(){
      this.authService.navigateToLogin();
    }


    getDanhMucLoaiKH(){
        this.apiService.get(UrlConstant.API.DANH_MUC + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`).subscribe((res:any)=>{
            this.listDMLoaiKH = res;
        });
    }

    getDanhMucNVPhuTrach(){
        this.apiService.get(UrlConstant.API.DANH_MUC + `?tenBang=GetKhachHangs&tenCot=NhanVienPhuTrach`).subscribe((res:any)=>{
            this.listDMNhanVienPhuTrach = res;
        });
    }
}
