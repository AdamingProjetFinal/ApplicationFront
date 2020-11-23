import { StatistiqueQuestionnaireComponent } from './statistique-questionnaire/statistique-questionnaire.component';
import { NgModule } from '@angular/core';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { Routes, RouterModule } from '@angular/router';

const adminRoutes: Routes = [

  { path: '', component: AccueilAdminComponent },
  { path: "statistique", component: StatistiqueQuestionnaireComponent, data: { title: "Statistiques détaillées" } }

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],

  exports: [RouterModule]
})

export class AdminRoutingModule { }
