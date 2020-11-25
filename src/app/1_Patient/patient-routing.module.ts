import { ConsulterMedecinComponent } from './consulter-medecin/consulter-medecin.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';

const patientRoutes: Routes = [
  
  { path: '', component: AccueilPatientComponent },
  { path: 'update', component: UpdatePatientComponent },
  {path: 'consulterMedecin', component:ConsulterMedecinComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(patientRoutes)],

  exports: [RouterModule]
})

export class PatientRoutingModule { }
