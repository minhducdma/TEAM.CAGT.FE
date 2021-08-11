import { Directive, Injector, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ActionEnum } from "src/app/core/constants/enum.constant";
import { DropDownListEnum } from "src/app/shared/controls/cagt-select/asc-select.enum";
import { IUserInfo } from "src/app/shared/auth/models/user-token.model";
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FOLDER } from "src/app/core/constants/app.constant";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IFile, IFileAttach } from "src/app/shared/models/file.model";
import { ApiService } from "src/app/core/services/api.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CustomTranslateService } from "src/app/core/services/custom-translate.service";
export interface IGenericeScience {
    id?: number;
    idFileDinhKem?: number;
    tenFile?: string;
    type?: number;
    size?: number;
    path?: string;
    forWeb?: boolean;
    checkSum?: string;
    guidId?: string;
    fileDinhKems?: any[];
}
@Directive()
export abstract class BaseFormComponent<T extends IGenericeScience> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;
    tabCurrentIndex = 0;
    form: FormGroup;
    isDisabled: false;
    dropdownListEnum = DropDownListEnum;
    fileInput: IFileAttach[] = [];
    user: IUserInfo;
    folder = FOLDER;
    userSelected: number[] = [];
    protected destroyed$ = new Subject();
    
    protected windowRef: WindowRef;
    protected apiService: ApiService;
    protected formBuilder: FormBuilder;
    protected translate: CustomTranslateService;
    constructor(
        injector : Injector
    ) {
        this.windowRef = injector.get(WindowRef);
        this.apiService = injector.get(ApiService);
        this.formBuilder = injector.get(FormBuilder);
        this.translate = injector.get(CustomTranslateService);

    }

    ngOnInit(): void {
        this.createForm();

        if (!this.action) {
            this.action = this.model && this.model.id ? ActionEnum.UPDATE : ActionEnum.CREATE;
        }

        if (this.action === ActionEnum.UPDATE) {
            this.form.patchValue(this.model);
            if (this.model && this.model.idFileDinhKem && this.model.idFileDinhKem > 0) {
                this.fileInput.push({
                    fileDinhKemId: this.model.idFileDinhKem,
                    name: this.model.tenFile,
                    size: this.model.size,
                    path: this.model.path,
                    guidId: this.model.guidId,
                    fileAttachId: null,
                    type: this.model.type,
                });
            }

            if (this.model && this.model.fileDinhKems != null && this.model.fileDinhKems.length > 0) {
                this.fileInput = this.model.fileDinhKems.map(m => {
                    return {
                        fileDinhKemId: m.idFileDinhKem,
                        // name: m.tenFile,
                        name: m.name,
                        size: m.size,
                        path: m.path,
                        guidId: m.guidId,
                        fileAttachId: null,
                        type: m.type,
                    };
                });

                const dataFile = this.model.fileDinhKems.map(m => {
                    return {
                        idFileDinhKem: m.idFileDinhKem,
                    };
                });
                this.form.get('fileDinhKems').setValue(dataFile);
            }
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    setFormValue(data) {
        this.form.patchValue(data);
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            try {
                this.form.get('idFileDinhKem').setValue(files[0].fileId);
            } catch {}
            try {
                const dataFile = files.map(m => {
                    return {
                        idFileDinhKem: m.fileId,
                    };
                });
                this.form.get('fileDinhKems').setValue(dataFile);
            } catch {}
        } else {
            try {
                this.form.get('idFileDinhKem').setValue(null);
            } catch {}
            try {
                this.form.get('fileDinhKems').setValue(null);
            } catch {}
        }
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract onSubmit();

    protected abstract createForm();

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }
}