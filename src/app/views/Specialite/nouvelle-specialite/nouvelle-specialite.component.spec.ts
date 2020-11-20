/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NouvelleSpecialiteComponent } from './nouvelle-specialite.component';

describe('NouvelleSpecialiteComponent', () => {
  let component: NouvelleSpecialiteComponent;
  let fixture: ComponentFixture<NouvelleSpecialiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleSpecialiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
