import { PatientService } from './../../service/patient/patient.service';
import { Patient } from './../../model/Patient';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { Consultation } from './../../model/Consultation';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-consulter-medecin',
  templateUrl: './consulter-medecin.component.html',
  styleUrls: ['./consulter-medecin.component.css']
})
export class ConsulterMedecinComponent implements OnInit {


  @ViewChild('myModal') public myModal: ModalDirective;
  calendarOptions;
  backrground: String;
  title: String;
  consultations: any[] = []
  consultation: Consultation = new Consultation();
  // idPatient;
  // @Input()  id :number
  infos = { note: null, deplacement: false, validationMedecin: false, dureeConsultation: 0 };
  constructor(private consultationService: ConsultationService,
    private auth: AuthentificationService,private patientService:PatientService
  ) { }


  ngOnInit(): void {

    this.buildEvent(1);

    //TODO
  }
  buildEvent(idMedecin: number) {



    //TODO
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title: "Réservé",
          start: consult.date,
          end: new Date(consult.date).setTime(new Date(consult.date).getTime() + duree),
          backgroundColor: "#02A307",
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
      height: 700,
      eventColor: "#C0C0C0",
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
      editable: false,
      timeZone: "Europe/Paris",
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      selectConstraint: {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '10:00',
        endTime: '18:00',
      },
      contentHeight: 650,
      aspectRatio: 2,
      expandRows: true,//pour étendre la hauteur de ligne si l'event est trop gros
      handleWindowResize: true,// réajuster quand on rétraici la fenêtre
      dateClick: (infos) => {


      },
      // ne peut sélectionnez que 1 heure
      selectAllow: (infos) => {


        //debut en milliseconde et fin max avant que ça déselectionn en millisecons
        // un patient ne peut choisir qu'un heure
        let fin = new Date(infos.end).getTime()
        let finMax = new Date(infos.start).setTime(new Date(infos.start).getTime() + (1000 * 60 * 60))
        setTimeout(() => {
          this.consulter(infos)
        },700);
       
        return finMax - fin >= 0;

      },

      slotDuration: "01:00:00",
      snapDuration: "01:30:00",
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      businessHours: {

        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '10:00',
        endTime: '18:00',
      },

    }
  } // méthode buildCalendar()

  consulter(infos) {
    // this.consultation.date =infos.start

    if (confirm("Etes-vous sûr de vouloir réserver créneau ? ("+infos.start+" - "+infos.end+")")) {
      this.consultation.date = new Date(infos.start);
      //TODO LAISSER LE CHOIX POUR LE DEPLACEMENT OU NON
      this.consultation.deplacement = false,
        this.consultation.dureeConsultation = 60,
        //TODO LAISSER LE CHOIX POUR La NOTE
        this.consultation.validationMedecin = false;
     //TDOD
     // allé chercher le patient et le medecin, le setter dans la consultation et envoyé la consultation.
      this.consultationService.save(this.consultation).subscribe(data => {
        alert("la consultation a bien été validé")
      })


    }
  }
}
