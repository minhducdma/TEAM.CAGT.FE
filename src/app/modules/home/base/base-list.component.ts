import { Directive, HostListener, Injector, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { GridDataResult, PagerSettings } from "@progress/kendo-angular-grid";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";
import { Observable, Subject } from "rxjs";
import { ActionEnum } from "src/app/core/constants/enum.constant";
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from "src/app/shared/controls/cagt-select/asc-select.enum";
import { IUserInfo } from "src/app/shared/auth/models/user-token.model";
import { AuthService } from "src/app/core/services/auth.service";
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { BaseCheckPermission } from "src/app/shared/auth/base/base-check-permission";
import { ReziseTable } from "src/app/core/constants/app.constant";
import { ViewFileComponent } from "src/app/shared/controls/view-file";
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { ApiService } from "src/app/core/services/api.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { NotificationService } from "src/app/core/services/notification.service";
import { CustomTranslateService } from "src/app/core/services/custom-translate.service";

@Directive()
export abstract class BaseListComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    protected action: ActionEnum;
    protected model: T;
    protected destroyed$ = new Subject();

    isLoading = false;
    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    user: IUserInfo;
    openFirstTime = false;
    searchAdvance = false;
    dropdownListEnum = DropDownListEnum;
    pageConfig: PagerSettings | boolean = false;
    selectionIds: number[] = [];
    nhanSuId: number;
    tabName: string;
    title: string;
    userSelected: number[] = [];

    rolesExtends = {
        ...this.roles,
        isPhanCong: false,
    };

    pageHeight = window.innerHeight - ReziseTable + 30;
    // tslint:disable-next-line: no-unsafe-any
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // tslint:disable-next-line: no-unsafe-any
        this.pageHeight = event.target.innerHeight - ReziseTable + 30;
    }

    protected auth: AuthService;
    protected windowService: WindowService;
    protected apiService: ApiService;
    protected translate: CustomTranslateService;
    constructor(
        injector : Injector
    ) {
        super(injector);
        this.auth = injector.get(AuthService);
        this.windowService = injector.get(WindowService);
        this.apiService = injector.get(ApiService);
        this.translate = injector.get(CustomTranslateService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.user = this.auth.getUserInfo();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        // tslint:disable-next-line: no-unsafe-any
        param.key = guidId;
        // tslint:disable-next-line: no-unsafe-any
        param.fileName = name;

        // tslint:disable-next-line: deprecation
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }

    editHandler(dataItem) {
        // tslint:disable-next-line: no-unsafe-any
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }
    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    protected abstract showFormCreateOrUpdate();

    protected abstract loadItems();

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
        };
    }
}