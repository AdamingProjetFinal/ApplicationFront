import { AuthentificationService } from './../../service/authentification/authentification.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { Consultation } from './../../model/Consultation';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accueil-medecin',
  templateUrl: './accueil-medecin.component.html',
  styleUrls: ['./accueil-medecin.component.scss']
})
export class AccueilMedecinComponent implements OnInit {

 @ViewChild('myModal') public myModal: ModalDirective;
  calendarOptions;
  backrground:String;
  title:String;
  consultations: any[] = []
  consultation:Consultation;
  // @Input()  id :number
  infos = { note: null, deplacement: false, validationMedecin: false, dureeConsultation: 0 };
  constructor(private consultationService: ConsultationService,
    private auth: AuthentificationService
  ) { }


  ngOnInit(): void {
    this.buildEvent(1);

    //TODO
  }
  buildEvent(idMedecin: number) {



    //TODO
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        if (consult.validationMedecin === false) {
          this.backrground = "#FF1F1F";
          //TODO mettre le nom du patient  sur le titre. si la consultation n'a pas de patient, les consultation n'apparaissent pas ne marche//
          this.title = consult.medecin.nom+" - "+" (Vous devez valider la consultation)"
          
        } else {
          this.backrground = "#02A307";
          this.title = consult.medecin.nom
        }
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title:this.title,
          start: consult.date,
          end: new Date(consult.date).setTime(new Date(consult.date).getTime() + duree),
          backgroundColor: this.backrground,
          idConsultation: consult.id,
          note: consult.note,
          deplacement: consult.deplacement,
          validationMedecin: consult.validationMedecin,
          dureeConsultation: consult.dureeConsultation,
        }
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
  console.log("je suis dans voir Détails")
    this.consultationService.getConsultation(inf.event.extendedProps.idConsultation).subscribe(data => {
      this.consultation = data.data;
      console.log(this.consultation);
      this.infos = inf.event.extendedProps
      this.myModal.show()
    })

  };

  valider() {
    this.consultation.validationMedecin = true;

    this.consultationService.update(this.consultation).subscribe(data => {

      location.reload()
      alert("la consultation a bien été validée")

    })

  }
}// class



