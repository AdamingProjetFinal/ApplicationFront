import { UpdatePrelevementComponent } from './update-prelevement/update-prelevement.component';
import { StatistiqueGainComponent } from './statistique-gain/statistique-gain.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { AdminGuardService } from './../service/guard/admin-guard.service';
import { LoginAdminComponent } from './login/login-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { GestionQuestionnairesComponent } from './gestion-questionnaires/gestion-questionnaires.component';

const adminRoutes: Routes = [

  {
    path: '', data: { title: "Accueil" },
    canActivate: [ AdminGuardService] , children: [

  { path: '', component: AccueilAdminComponent },
  { path: "statistique", component: StatistiqueQuestionnaireComponent, data: { title: "Statistiques détaillées" } },
  { path: "questionnaire", component: GestionQuestionnairesComponent, data: { title: "Gestion des questionnaires" } },
  { path: 'users', component: UsersAdminComponent, data: { title: "Gestion des utilisateurs"} },
  { path: 'editer', component: UpdateAdminComponent, data: { title: "Modifier le mot de passe administrateur"} },
  { path: 'gain', component: StatistiqueGainComponent, data: { title: "Statistique des gain de l'application"} },
  { path: 'taxe', component: UpdatePrelevementComponent, data: { title: "Modification du pourcentage de prélévement"} }
  
  ]},
{ path: "login", component: LoginAdminComponent, data: { title: "Connexion en tant qu'administrateur" } }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],

  exports: [RouterModule]
})

export class AdminRoutingModule { }
