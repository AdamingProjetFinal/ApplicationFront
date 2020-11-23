import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Imports components
import { PatientRoutingModule } from './patient-routing.module';
import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilPatientComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PatientRoutingModule
  ]
})

export class PatientModule { }
