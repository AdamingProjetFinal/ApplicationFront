import { AraigneeComponent } from './../views/Araignee/Araignee.component';
import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ChartsModule } from 'ng2-charts';


import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilAdminComponent,
    StatistiqueQuestionnaireComponent,
    AraigneeComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
