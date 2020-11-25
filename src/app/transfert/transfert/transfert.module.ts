import { AppModule } from './../../app.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    
  ],
  exports:[ModalModule,FullCalendarModule]
  
})
export class TransfertModule { }