import { Consultation } from './../../model/Consultation';
import { Router, ActivatedRoute } from '@angular/router';
import { MedecinService } from './../../service/medecin/medecin.service';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { PatientService } from './../../service/patient/patient.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarApi, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment'

@Component({
  selector: 'app-calendrier-medecin',
  templateUrl: './calendrier-medecin.component.html',
  styleUrls: ['./calendrier-medecin.component.scss']
})
export class CalendrierMedecinComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  @Input()
  IdMedecein = 1
  calendarOptions = {};
  backrground: String;
  title: String;
  calendarApi: CalendarApi;
  consultations: any[] = []
  consultation: Consultation = new Consultation();

  constructor(private consultationService: ConsultationService,
    private auth: AuthentificationService, private patientService: PatientService,
    private specialiteService: SpecialiteService,
    private medecinService: MedecinService,
    private rt: Router,
    private ar: ActivatedRoute) { }

  ngOnInit() {
    this.buildEvent(this.IdMedecein);
  }

  ngOnChanges() {
    this.consultations = []
    this.buildEvent(this.IdMedecein)
  }

  // construction du calendrier
  buildEvent(idMedecin: number) {
    //TODO
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title: "Réservé : Docteur " + consult.medecin.nom,
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
        }, 700);

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
    this.consultation.date = new Date(infos.start)
    console.log(infos.start)
    let date = new Date(infos.start).toLocaleString('en-Fr', { timeZone: 'UTC' })
    if (confirm("Etes-vous sûr de vouloir réserver créneau de " + moment(date).format("HH") + " h?")) {

      this.consultation.date = new Date(date)
      this.consultation.deplacement = confirm("Voulez-vous un déplacement à domicile?"),
        this.consultation.note = prompt("Ajoutez une précision à faire parvenir au médecin"),
        this.consultation.dureeConsultation = 60,
        this.consultation.validationMedecin = false;
      this.consultationService.saveConsultationMedPat(this.consultation, this.IdMedecein, this.auth.getUserId()).subscribe(data => {

        alert("la consultation a bien été envoyé au médecin")
        setTimeout(() => {
          this.rt.navigate(['/patient'])
        }, 500);
      })
    }
  }

}
