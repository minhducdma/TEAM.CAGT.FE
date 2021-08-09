import { Component, Injector, OnInit } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';
import { IProduct } from '../../model/home.model';
import { products } from './example-data';

@Component({
    selector: 'app-product-cate',
    templateUrl: './product-cate.component.html',
})
export class ProductCateComponent extends BaseListComponent<IProduct> implements OnInit {
    public gridData: IProduct[] = [];

    constructor(
        injector: Injector
    ) {
        super(injector)
    }
    ngOnInit() {
        super.ngOnInit();
    }

    protected showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    protected loadItems() {
        this.gridData = products as IProduct[];
    }
    removeHandler(item){
        
    }
}
