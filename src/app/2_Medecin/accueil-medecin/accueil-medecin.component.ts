import { Medecin } from './../../model/Medecin';
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
  backrground: String;
  title: String;
  consultations: any[] = []
  consultation: Consultation;
  // @Input()  id :number
  infos = { note: null, deplacement: false, validationMedecin: false, dureeConsultation: 0 };
  
  // Declaration des attributs
  medecin: Medecin;
  consultsCar: Consultation[] = new Array(); 
  futurPatient: Consultation[] = new Array();


  constructor(
    private consultationService: ConsultationService,
    private authService: AuthentificationService
  ) { }


  ngOnInit(): void {
    this.buildEvent(1);
    this.medecin = this.authService.getUser();

    this.consultationService.getConsultationsByIdMedecin(this.authService.getUserId()).subscribe(
      (data) => {
        this.consultsCar = data;
        const sortByMapped = (map,compareFn) => (a,b) => compareFn(map(a),map(b));
        const toDate = e => new Date(e.date).getTime();
        const byValue = (a,b) => a - b;
        const byDate = sortByMapped(toDate,byValue);
        console.log(this.consultsCar.sort(byDate).reverse());
        if(this.consultsCar.length <= 5) {
          this.futurPatient = this.consultsCar;
        } else {
          for (let i = 0; i < 5; i++) {
            this.futurPatient.push(this.consultsCar[i]);
          }
        }
      }
    )
  }


  buildEvent(idMedecin: number) {
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        if (consult.validationMedecin === false) {
          this.backrground = "#FF1F1F";
          //TODO mettre le nom du patient  sur le titre. si la consultation n'a pas de patient, les consultation n'apparaissent pas ne marche//
          this.title = consult.medecin.nom + " - " + " (Vous devez valider la consultation)"

        } else {
          this.backrground = "#02A307";
          this.title = consult.medecin.nom
        }
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title: this.title,
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
      initialView: "dayGridWeek",
      height:1100,
      eventColor: "#24343c",
      events: this.consultations,
    
      locale: "fr",
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,list'
      },
      buttonText: {
        today: "Aujourd'hui",
        week: "Semaine",
        month: "Mois",
        list: "Liste"
      },
      themeSystem: 'bootstrap',
      nowIndicator: true,
      editable: true,
      timeZone: "Europe/Paris",
      //pour patient
      // selectable: true,
      // selectMirror: true,
      // selectOverlap: false,
      selectConstraint: {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '10:00',
        endTime: '18:00',
      },
      contentHeight:650,
      aspectRatio:2,
      expandRows:true,//pour étendre la hauteur de ligne si l'event est trop gros
      handleWindowResize:true,// réajuster quand on rétraici la fenêtre
     
      //pour patient
      // dateClick: (infos) => {
      //  alert("je suis la")
      // },
      // pour le patient
      // slotDuration: "01:00:00",
      // snapDuration: "01:30:00",
      businessHours: {

        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '10:00',
        endTime: '18:00',
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

}



