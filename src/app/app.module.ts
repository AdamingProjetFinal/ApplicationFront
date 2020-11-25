import { AraigneeComponent } from './views/Araignee/Araignee.component';
import { AlerteComponent } from './views/alerte/alerte.component';
import { FormActeComponent } from './views/Acte/form-acte/form-acte.component';
import { NouvelleSpecialiteComponent } from './views/Specialite/Nouvelle-specialite/Nouvelle-specialite.component';
import { FormsPatientComponent } from './views/Patient/forms-patient/forms-patient.component';
import { ListPatientComponent } from './views/Patient/list-patient/list-patient.component';
import { PatientComponent } from './views/Patient/Patient.component';
import { ListMedecinComponent } from './views/Medecin/list-medecin/list-medecin.component';
import { FormsMedecinComponent } from './views/Medecin/forms-medecin/forms-medecin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/angular';
import timeGridPlugin from "@fullcalendar/timegrid";
import list from "@fullcalendar/list";

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { MedecinComponent } from './views/Medecin/Medecin.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { PlanningComponent} from './views/Medecin/planning/planning.component';


// plugin fullcalendar
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  list,
]);


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    ModalModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    FullCalendarModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    MedecinComponent,
    FormsMedecinComponent,
    ListMedecinComponent,
    PatientComponent,
    ListPatientComponent,
    FormsPatientComponent,
    NouvelleSpecialiteComponent,
    FormActeComponent,
    AlerteComponent,
    PlanningComponent

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
