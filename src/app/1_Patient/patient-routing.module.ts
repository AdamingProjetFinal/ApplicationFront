import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';

const patientRoutes: Routes = [
  
  { path: '', component: AccueilPatientComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(patientRoutes)],

  exports: [RouterModule]
})

export class PatientRoutingModule { }
