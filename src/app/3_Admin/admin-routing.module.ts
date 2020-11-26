import { UsersAdminComponent } from './users-admin/users-admin.component';
import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { GestionQuestionnairesComponent } from './gestion-questionnaires/gestion-questionnaires.component';

const adminRoutes: Routes = [

  { path: '', component: AccueilAdminComponent, data: { title: "Admin" } },
  { path: "statistique", component: StatistiqueQuestionnaireComponent, data: { title: "Statistiques détaillées" } },
  { path: "questionnaire", component: GestionQuestionnairesComponent, data: { title: "Gestion des questionnaires" } },
  { path: 'users', component: UsersAdminComponent, data: { title: "Gestion des utilisateurs"} }


];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],

  exports: [RouterModule]
})

export class AdminRoutingModule { }
