import { ConsulterMedecinComponent } from './consulter-medecin/consulter-medecin.component';
import { FicheMedicalPatientComponent } from './ficheMedical-patient/ficheMedical-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';

const patientRoutes: Routes = [
  
  {
    path: '', data: { title: "Accueil" }, children: [
      { path: '', component: AccueilPatientComponent },
      { path: 'update', data: { title: "mise à jour" } ,component: UpdatePatientComponent },
      { path: 'consulterMedecin', data: { title: "Consultations" } ,component: ConsulterMedecinComponent },
      { path: 'fiches', data: { title: "Fiches Médicales" } ,component: FicheMedicalPatientComponent }]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(patientRoutes)],

  exports: [RouterModule]
})

export class PatientRoutingModule { }
