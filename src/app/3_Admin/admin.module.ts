import { UpdatePrelevementComponent } from './update-prelevement/update-prelevement.component';
import { StatistiqueGainComponent } from './statistique-gain/statistique-gain.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { LoginAdminComponent } from './login/login-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { TransfertModule } from './../transfert/transfert/transfert.module';
import { AraigneeComponent } from './../views/Araignee/Araignee.component';
import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ChartsModule } from 'ng2-charts';


import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { GestionQuestionnairesComponent } from './gestion-questionnaires/gestion-questionnaires.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilAdminComponent,
    StatistiqueQuestionnaireComponent,
    AraigneeComponent,
    GestionQuestionnairesComponent,
    LoginAdminComponent,
    UsersAdminComponent,
    UpdateAdminComponent,
    StatistiqueGainComponent,
    UpdatePrelevementComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    TransfertModule
  ]
})
export class AdminModule { }
