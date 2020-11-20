/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActeComponent } from './Acte.component';

describe('ActeComponent', () => {
  let component: ActeComponent;
  let fixture: ComponentFixture<ActeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
