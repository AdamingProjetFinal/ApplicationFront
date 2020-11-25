import { ConsulterMedecinComponent } from './1_Patient/consulter-medecin/consulter-medecin.component';
import { Consultation } from './model/Consultation';
import { PlanningComponent } from './views/Medecin/planning/planning.component';
import { FormActeComponent } from './views/Acte/form-acte/form-acte.component';
import { ListPatientComponent } from './views/Patient/list-patient/list-patient.component';
import { FormsPatientComponent } from './views/Patient/forms-patient/forms-patient.component';
import { PatientComponent } from './views/Patient/Patient.component';
import { NouvelleSpecialiteComponent } from './views/Specialite/Nouvelle-specialite/Nouvelle-specialite.component';
import { ListMedecinComponent } from './views/Medecin/list-medecin/list-medecin.component';
import { FormsMedecinComponent } from './views/Medecin/forms-medecin/forms-medecin.component';
import { MedecinComponent } from './views/Medecin/Medecin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  { path: '404', component: P404Component, data: {title: 'Page 404'} },
  
  { path: '500', component: P500Component, data: {title: 'Page 500'} },
  
  { path: 'login', component: LoginComponent, data: {title: 'Login Page'} },
  
  { path: 'register', component: RegisterComponent, data: {title: 'Register Page'} },

  
  { 
    path: '', component: DefaultLayoutComponent, data: { title: 'Home' },
    children: [
      { path: 'patient', loadChildren: () => import('./1_Patient/patient.module').then(m => m.PatientModule),
        data: { title: "Patient-Home"} },

      { path: 'medecin', loadChildren: () => import('./2_Medecin/medecin.module').then(m => m.MedecinModule),
        data: {title: "Medecin-Home"} },

      { path: 'admin', loadChildren: () => import('./3_Admin/admin.module').then(m => m.AdminModule),
        data: {title: "Admin-Home"} }
    ]
  },
  
  
  { path: '', component: DefaultLayoutComponent, data: {title: 'Home', },
    children: [
      {
        path: "specialite/new", component: NouvelleSpecialiteComponent, data: { title: "Nouvelle Spécialité" }
      },

      {
        path: "acte/new", component: FormActeComponent, data: { title: "Nouvel acte" }
      },
      {
        path: "medecine", component: MedecinComponent, data: { title: "Medecin" },
        children: [
          {
            path: 'update/:id', component: FormsMedecinComponent, data: {title: 'Mise à jour'}
          },
          {
            path: 'update', component: FormsMedecinComponent, data: {title: 'Mise à jour'}
          },
          {
            path: 'list', component: ListMedecinComponent, data: {title: 'Liste des médecins'}
          },
          {
            path: "planning", component: PlanningComponent, data: { title: "Planning" }
          },
        ]
      },
      {
        path: "patiente", component: PatientComponent, data: { title: "Patient" },
        children: [
          {
            path: 'update/:id', component: FormsPatientComponent, data: {title: 'Mise à jour'}
          },
          {
            path: 'update', component: FormsPatientComponent, data: {title: 'Mise à jour'}
          },
          {
            path: 'list', component: ListPatientComponent, data: {title: 'Liste des patients'}
          }
        ]
      },
      {
        path: 'base', loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  

  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
