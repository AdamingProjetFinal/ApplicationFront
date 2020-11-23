import { NgModule } from '@angular/core';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { Routes, RouterModule } from '@angular/router';

const adminRoutes: Routes = [

  { path: ' ', component: AccueilAdminComponent  },

];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes)],

  exports: [RouterModule]
})

export class AdminRoutingModule { }
