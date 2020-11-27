import { FichesMedecinComponent } from './fiches-medecin/fiches-medecin.component';
import { PatientsMedecinComponent } from './patients-medecin/patients-medecin.component';
import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilMedecinComponent } from './accueil-medecin/accueil-medecin.component';

const medecinRoutes: Routes = [

  {
    path: '', data: { title: "Accueil" }, children: [
      { path: '', component: AccueilMedecinComponent },
      { path: 'update', data: { title: "mise à jour" }, component: UpdateMedecinComponent },
      { path: 'patients', data: { title: "Patients" }, component: PatientsMedecinComponent },
      { path: 'fiches', data: { title: "Fiches Médicales" }, component: FichesMedecinComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(medecinRoutes)],

  exports: [RouterModule]
})

export class MedecinRoutingModule { }
