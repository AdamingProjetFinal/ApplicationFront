import { InfoConsultationPatientComponent } from './infoConsultation-patient/infoConsultation-patient.component';
import { FicheMedicalPatientComponent } from './ficheMedical-patient/ficheMedical-patient.component';
import { TransfertModule } from './../transfert/transfert/transfert.module';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Imports components
import { PatientRoutingModule } from './patient-routing.module';
import { AccueilPatientComponent } from './accueil-patient/accueil-patient.component';
import { ConsulterMedecinComponent } from './consulter-medecin/consulter-medecin.component';
import { ReponseQuestionnaireComponent } from './reponseQuestionnaire/reponseQuestionnaire.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilPatientComponent,
    UpdatePatientComponent,
    ConsulterMedecinComponent,
    ReponseQuestionnaireComponent,
    FicheMedicalPatientComponent,
    InfoConsultationPatientComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PatientRoutingModule,
    TransfertModule
  ]
})

export class PatientModule { }
