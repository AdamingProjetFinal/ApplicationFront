import { FicheMedicalPatientComponent } from './ficheMedical-patient/ficheMedical-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';

const patientRoutes: Routes = [
  
  { path: '', component: AccueilPatientComponent },
  { path: 'update', component: UpdatePatientComponent },
  { path: 'fiches', component: FicheMedicalPatientComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(patientRoutes)],

  exports: [RouterModule]
})

export class PatientRoutingModule { }
