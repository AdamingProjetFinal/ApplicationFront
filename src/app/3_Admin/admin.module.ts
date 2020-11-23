import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ChartsModule } from 'ng2-charts';


import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilAdminComponent,
    StatistiqueQuestionnaireComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    ChartsModule
  ]
})
export class AdminModule { }
