/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaoDeThiComponent } from './taoDeThi.component';

describe('TaoDeThiComponent', () => {
  let component: TaoDeThiComponent;
  let fixture: ComponentFixture<TaoDeThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoDeThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoDeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
