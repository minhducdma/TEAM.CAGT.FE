import { Component, OnInit } from '@angular/core';
import { products } from './example-data';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  constructor() { }
  public gridData: any[] = products;
  ngOnInit() {
  }

}
