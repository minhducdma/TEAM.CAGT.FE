import { Component, Injector, OnInit } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';
import { ICauHoi } from '../../model/test-exam.model';

@Component({
    selector: 'app-create-test',
    templateUrl: './create-test.component.html',
    styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent extends BaseListComponent<ICauHoi> implements OnInit {

    protected showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    protected loadItems() {
        throw new Error('Method not implemented.');
    }
    public expandedKeys: number[] = [1];

    text: string = "";
    public data: ICauHoi[] = [];

    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit() {
    }

    showData() {
        console.log(this.data);
    }
    addnew() {
        let f = {
            id: Math.random(),
            parentId: 0,
            codeCauHoi: 0,
            tenCauHoi: "string",
            noiDungCauHoi: "string",
            chiaSeUsers: "string",
            loaiCauHoi: "string",
            trangThaiCauHoi: "string",
            tongSoDiem: 0,
            tongThoiGian: 0,
            metadata: "string"
        } as ICauHoi;
        this.data.push(f);
    }
}
