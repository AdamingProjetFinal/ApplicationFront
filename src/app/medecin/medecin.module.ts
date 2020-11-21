import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedecinRoutingModule } from './medecin-routing.module';
import { AccueilMedecinComponent } from './accueil-medecin/accueil-medecin.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilMedecinComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MedecinRoutingModule
  ]
})
export class MedecinModule { }
