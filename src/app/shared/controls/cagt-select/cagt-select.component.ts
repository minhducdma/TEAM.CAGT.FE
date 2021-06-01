import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { DropDownListEnum } from './asc-select.enum';

export interface CagtSelectOption {
    id: number;
    text: string;
    item?: any;
}

@Component({
    selector: 'app-cagt-select',
    templateUrl: './cagt-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CagtSelectComponent),
        },
    ],
})



export class CagtSelectComponent implements OnInit {
    @Input() modeOfDropDowList: DropDownListEnum;
    @Input() placeHolder?: string;
    @Input() isReference = false;
    @Input() referenceId?: string;
    @Input() selected?: number;
    @Input() mode = 'default';
    @Input() isDisabled = false;
    @Input() permissionType?: number = 1;
    @Input() excludeIds?: number[] = [];
    @Input() isAllowClear = true;

    
    value: string;

    listOfOption: CagtSelectOption[] = [];
    selectedValue: number;
    reference: string;

    isLoading = false;

    private destroyed$ = new Subject();
    private fieldSortOfCatalog = 'stt';

    constructor(private apiService: ApiService) {}

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
        this.selectedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.referenceId) {
            this.reference = changes.referenceId.currentValue;
            this.isDisabled = !(this.reference && this.isReference);
            if (this.reference === null || this.reference === undefined) {
                this.value = null;
                this.writeValue(this.value);
            }
            this.init();
        }
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    init(){
        // switch (this.modeOfDropDowList) {
        //     case DropDownListEnum.DEMO_CATEGORY:
        //         this.loadDemoCategory();
        //         break;
        // }
    }

    // loadDemoCategory(){
    //     this.apiService
    //         .post(
    //             UrlConstant.API.DM_CONG_CU + '/GetList',
    //             {
    //                 isVisible: true,
    //                 pageSize: 0,
    //                 pageNumber: 0,
    //                 idRef: this.referenceId != null ? this.referenceId : null,
    //             },
    //             true
    //         )
    //         .pipe(
    //             map(res => res.result),
    //             takeUntil(this.destroyed$)
    //         )
    //         .subscribe(res => {
    //             const items = res.items;
    //             this.listOfOption = items.map(m => {
    //                 return {
    //                     id: m.id,
    //                     text: `${m.ma} - ${m.ten}`,
    //                 };
    //             });
    //         });
    // }
}
