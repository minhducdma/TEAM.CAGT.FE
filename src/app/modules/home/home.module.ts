import { LoginIdentityServerComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzContextMenuServiceModule, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CagtSelectModule } from 'src/app/shared/controls/cagt-select/cagt-select.module';
import { ControlErrorModule } from 'src/app/shared/controls/control-error/control-error.module';
import { FieldErrorModule } from 'src/app/shared/controls/field-error/field-error.module';
import { ViewFileModule } from 'src/app/shared/controls/view-file';
import { FormDirectiveModule } from 'src/app/shared/directives/forms';
import { CustomPipeModule } from 'src/app/shared/pipes/custom-pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetModule } from 'src/app/shared/widgets';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FormCustomerComponent } from './components/customer/form-customer/form-customer.component';

import { HomeRoutingModule } from './home.routing';


@NgModule({
    declarations: [
        HomeComponent,
        CustomerComponent,
        FormCustomerComponent,
        LoginIdentityServerComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        ControlErrorModule,
        GridModule,
        ViewFileModule,
        DialogsModule,
        TooltipModule,
        NzContextMenuServiceModule,
        NzNotificationModule,
        NzModalModule,
        NzToolTipModule,
        NzSelectModule,
        NzTabsModule,
        NzAvatarModule,
        NzButtonModule,
        NzInputNumberModule,
        NzUploadModule,
        NzAffixModule,
        NzIconModule,
        NzDropDownModule,
        NzDatePickerModule,
        NzPopoverModule,
        NzResultModule,
        NzCollapseModule,
        NzEmptyModule,
        FieldErrorModule,
        CagtSelectModule,
        //WidgetModule,
        CustomPipeModule,
        TranslateModule,
        FormDirectiveModule,
        GridModule,

    ],
    exports: [],
    providers: [
    ],
})
export class HomeModule { }
