import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';

import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';

@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilAdminComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
