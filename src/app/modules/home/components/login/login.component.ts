import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { finalize, map, tap } from 'rxjs/operators';

import { BaseListComponent } from '../../base/base-list.component';
import { IKhachHang } from '../../model/home.model';
import { CustomerDataExample } from './example-data';

import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
    selector: 'login-test',
    templateUrl: './login.component.html'
})
export class LoginIdentityServerComponent extends BaseListComponent<IKhachHang> implements OnInit {
    protected showFormCreateOrUpdate() {
      throw new Error('Method not implemented.');
    }
    protected loadItems() {
      throw new Error('Method not implemented.');
    }
    public gridData: GridDataResult;
    //url: string = UrlConstant.API.DM_VAI_TRO_KHCN;

    constructor(
        injector: Injector,
        private authService: AuthService,
        private oAuthService: OAuthService
    ) {
        super(injector)
    }
    ngOnInit() {
        super.ngOnInit();
    }


    onExportExcel(){
      this.authService.navigateToLogin();
    }
    login() {
      this.authService.navigateToLogin();
    }
    get hasLoggedIn(): boolean {
      return this.oAuthService.hasValidAccessToken();
      // return false;
    }
}
