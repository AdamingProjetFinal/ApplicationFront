/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormActeComponent } from './form-acte.component';

describe('FormActeComponent', () => {
  let component: FormActeComponent;
  let fixture: ComponentFixture<FormActeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormActeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
