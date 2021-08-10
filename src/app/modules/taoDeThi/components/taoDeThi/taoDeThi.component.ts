import { Component, Injector, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/modules/home/base/base-list.component';
import { ICauHoi } from '../../model/taoDeThi.model';

@Component({
  selector: 'app-taoDeThi',
  templateUrl: './taoDeThi.component.html',
  styleUrls: ['./taoDeThi.component.scss']
})
export class TaoDeThiComponent extends BaseListComponent<ICauHoi> implements OnInit {
  
  protected showFormCreateOrUpdate() {
    throw new Error('Method not implemented.');
  }
  protected loadItems() {
    throw new Error('Method not implemented.');
  }
  public expandedKeys: number[] = [1];

  text: string ="";
  public data: ICauHoi[] = [];
  
  constructor(
    injector: Injector
  ) {
    super(injector)
   }

  ngOnInit() {
  }

  showData(){
    console.log(this.data);
}
addnew(){
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
