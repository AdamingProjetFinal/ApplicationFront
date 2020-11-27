/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatistiqueGainComponent } from './statistique-gain.component';

describe('StatistiqueGainComponent', () => {
  let component: StatistiqueGainComponent;
  let fixture: ComponentFixture<StatistiqueGainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiqueGainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueGainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
