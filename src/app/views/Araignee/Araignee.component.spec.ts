/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AraigneeComponent } from './Araignee.component';

describe('AraigneeComponent', () => {
  let component: AraigneeComponent;
  let fixture: ComponentFixture<AraigneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AraigneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AraigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
