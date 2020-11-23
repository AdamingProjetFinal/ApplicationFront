import { AuthentificationService } from './../../../service/authentification/authentification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConsultationService } from './../../../service/consultation/consultation.service';
import { MedecinService } from './../../../service/medecin/medecin.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { buildEventApis } from '@fullcalendar/core';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  calendarOptions;
  backrground;
  consultations: any[] = []
  // @Input()  id :number
  infos ={note: null, deplacement: false, validationMedecin: false, dureeConsultation:0};
  constructor(private consultationService: ConsultationService,
    private auth : AuthentificationService
    ) { }


  ngOnInit(): void {
    this.buildEvent(1);

    //TODO
  }
  buildEvent(idMedecin:number) {

     

     //TODO
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        if (consult.validationMedecin === false) {
          this.backrground = "red";
        } else {
          this.backrground = "green";
        }
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title: consult.medecin.nom,
          start: consult.date,
          end: new Date(consult.date).setTime(new Date(consult.date).getTime() + duree),
          backgroundColor: this.backrground,
          note: consult.note,
          deplacement : consult.deplacement,
          validationMedecin :consult.validationMedecin,
          dureeConsultation : consult.dureeConsultation,
        }
        // id: number;
        // date: Date;
        // note: String;
        // deplacement: boolean;
        // validationMedecin: boolean;
        // dureeConsultation:number;
        // medecin: Medecin;
        // patient: Patient;
        // acts: Acte[];
        this.consultations.push(event)
      });//foreach
      this.buildCalendar();
    })//subscribe
  }// méthode buildEvent()

  buildCalendar() {
    this.calendarOptions = {
      eventColor: "#24343c",
      events: this.consultations,
      initialView: "timeGridWeek",
      locale: "fr",
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,list'
      },
      buttonText: {
        today: "Aujourd'hui",
        month: "Mois",
        week: "Semaine",
        list: "Liste"
      },
      themeSystem: 'bootstrap',
      nowIndicator: true,
      editable: true,
      timeZone: "Europe/Paris",
      // selectable: true, 
      // selectMirror: true,
      // unselectAuto: true,
      select: (infos) => {
        console.log(infos)
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [1, 2, 3, 4], // Monday - Thursday
        startTime: '10:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      eventClick: (inf) => {
        console.log("je suis là")
        this.voirDetailsConsultation(inf);
      },
    }
  } // méthode buildCalendar()

  voirDetailsConsultation(inf) {
    console.log(inf.event.extendedProps)
    this.infos = inf.event.extendedProps
    this.myModal.show()
  };
}// class
