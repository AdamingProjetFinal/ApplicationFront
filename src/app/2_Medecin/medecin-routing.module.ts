import { FichesMedecinComponent } from './fiches-medecin/fiches-medecin.component';
import { PatientsMedecinComponent } from './patients-medecin/patients-medecin.component';
import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilMedecinComponent } from './accueil-medecin/accueil-medecin.component';

const medecinRoutes: Routes = [

  { path: '', component: AccueilMedecinComponent  },
  { path: 'update', component: UpdateMedecinComponent },
  { path: 'patients', component: PatientsMedecinComponent },
  { path: 'fiches', component: FichesMedecinComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(medecinRoutes)],

  exports: [RouterModule]
})

export class MedecinRoutingModule { }
