import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { finalize, map, tap } from 'rxjs/operators';
import { PageConfig } from 'src/app/core/constants/app.constant';
import { ActionEnum } from 'src/app/core/constants/enum.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { IPagedResult } from 'src/app/shared/models/response-data.model';
import { BaseListComponent } from '../../base/base-list.component';
import { IKhachHang } from '../../model/home.model';
import { CustomerDataExample } from './example-data';
import { FormCustomerComponent } from './form-customer/form-customer.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent extends BaseListComponent<IKhachHang> implements OnInit {
    public gridData: GridDataResult;
    //url: string = UrlConstant.API.DM_VAI_TRO_KHCN;

    constructor(
        injector: Injector,
        public api: ApiService
    ) {
        super(injector)
    }
    ngOnInit() {
        super.ngOnInit();
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
        // CustomerDataExample;
        // this.gridData = {
        //     data: CustomerDataExample.results.items.slice(this.gridState.skip, this.gridState.skip + this.gridState.take),
        //     total: CustomerDataExample.results.pagingInfo.totalItems,
        // };

        this.isLoading = true;
        console.log(UrlConstant.API.KHACH_HANG);
        this.gridView$ = this.apiService.get(UrlConstant.API.KHACH_HANG, {}).pipe(
            map(res => {
                debugger;
                console.log(res)
                const results = res.result as IPagedResult<any[]>;
                if (results && results.items) {
                    return {
                        data: results.items,
                        total: results.totalCount,
                    };
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.isLoading = false))
        );
    }
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    removeSelectedHandler() {
        // if (this.selectionIds.length > 0) {
        //     const body = {
        //         ids: this.selectionIds,
        //     };
        //     this.modal.confirm({
        //         nzTitle: ModalDeleteConfig.title,
        //         nzContent: ModalDeleteConfig.content,
        //         nzOkText: ModalDeleteConfig.yes,
        //         nzOkType: 'danger',
        //         nzOnOk: () => {
        //             this.apiService
        //                 .delete(this.url, body)
        //                 .pipe(takeUntil(this.destroyed$))
        //                 .subscribe(res => {
        //                     this.selectionIds = [];
        //                     this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
        //                     this.loadItems();
        //                 });
        //         },
        //         nzCancelText: ModalDeleteConfig.no,
        //         nzOnCancel: () => { },
        //     });
        // }
    }
    editHandler(dataItem) {
        this.action = ActionEnum.UPDATE;
        this.model = dataItem;
        this.showFormCreateOrUpdate();
    }
    onExportExcel(){

    }
}
