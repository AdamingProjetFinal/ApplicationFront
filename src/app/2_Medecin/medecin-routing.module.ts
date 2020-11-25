import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilMedecinComponent } from './accueil-medecin/accueil-medecin.component';

const medecinRoutes: Routes = [

  { path: '', component: AccueilMedecinComponent  },
  { path: 'update', component: UpdateMedecinComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(medecinRoutes)],

  exports: [RouterModule]
})

export class MedecinRoutingModule { }
