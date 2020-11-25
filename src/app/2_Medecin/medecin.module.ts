import { FichesMedecinComponent } from './fiches-medecin/fiches-medecin.component';
import { PatientsMedecinComponent } from './patients-medecin/patients-medecin.component';
import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { TransfertModule } from './../transfert/transfert/transfert.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedecinRoutingModule } from './medecin-routing.module';
import { AccueilMedecinComponent } from './accueil-medecin/accueil-medecin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/angular';
import timeGridPlugin from "@fullcalendar/timegrid";
import list from "@fullcalendar/list";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  list,
]);


@NgModule({
  // Ajouter chaque composant de patient
  declarations: [
    AccueilMedecinComponent,
    UpdateMedecinComponent,
    PatientsMedecinComponent,
    FichesMedecinComponent
 
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MedecinRoutingModule,
    // FullCalendarModule,
    TransfertModule
  ]
})
export class MedecinModule { }
