import { Router, ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MedecinService } from './../../service/medecin/medecin.service';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { Specialite } from './../../model/Specialite';
import { Observable, combineLatest } from 'rxjs';
import { Medecin } from './../../model/Medecin';
import { FormControl } from '@angular/forms';
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

  IdMed = -1

  // Paramètre pour la liste des medecins et le filtre 
  filter: FormControl;
  listMedecin: Medecin[]
  filterSpe: FormControl;
  filter$: Observable<string>;
  listSpecialites: Specialite[];
  filterSpe$: Observable<string>;
  medecin$: Observable<Medecin[]>
  filteredMedecin$: Observable<Medecin[]>;
  listSpecialites$: Observable<Specialite[]>;
  //
  calendarOptions;
  backrground: String;
  title: String;
  consultations: any[] = []
  consultation: Consultation = new Consultation();
  idUser :number;
  // idPatient;
  // @Input()  id :number
  infos = { note: null, deplacement: false, validationMedecin: false, dureeConsultation: 0 };
  constructor(private consultationService: ConsultationService,
    private auth: AuthentificationService, private patientService: PatientService,
    private specialiteService: SpecialiteService,
    private medecinService: MedecinService,
    private rt: Router,
    private ar: ActivatedRoute
  ) {
    this.medecin$ = this.getList();
    // nom des champs dans le HTML
    this.filter = new FormControl('');
    this.filterSpe = new FormControl('');
    // Différents filtres utilisés
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filterSpe$ = this.filterSpe.valueChanges.pipe(startWith(''))
    // filtrage des données de la liste de médecins (Observable<Medecin[]>)
    this.filteredMedecin$ = combineLatest([this.medecin$, this.filter$, this.filterSpe$])
      .pipe(
        map(([listMedecin, filterString, filterSpe]) =>
          listMedecin
            .filter(medecin =>
              (medecin.nom ? medecin.nom.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 : true)
              && (filterSpe ? medecin.specialite.nom === filterSpe : true)
            )
        )
      );
  }


  ngOnInit(): void {
    this.ar.queryParamMap.subscribe(Param => {
      // récupération de l'id du médecin
      let id = parseInt(Param.get("id"))
      if (id != undefined) {
        this.IdMed = id;
      }
      this.buildEvent(this.IdMed);
    })
    this.getSepcialites();


    //TODO
  }
  // construction du calendrier
  buildEvent(idMedecin: number) {



    //TODO
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(data => {
      data.forEach(consult => {
        let duree = consult.dureeConsultation * 60 * 1000;
        let event = {
          title: "Réservé : Docteur" + consult.medecin.nom,
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
    if (confirm("Etes-vous sûr de vouloir réserver créneau ? (" + infos.start + " - " + infos.end + ")")) {
     let date = new Date(infos.start).toLocaleString('en-Fr', { timeZone: 'UTC' })
     this.consultation.date = new Date(date)
      ;
      //TODO LAISSER LE CHOIX POUR LE DEPLACEMENT OU NON
      this.consultation.deplacement = false,
        this.consultation.dureeConsultation = 60,
        //TODO LAISSER LE CHOIX POUR La NOTE
        this.consultation.validationMedecin = false;
        this.consultationService.saveConsultationMedPat(this.consultation,this.IdMed,this.auth.getUserId()).subscribe(data=>{

          alert("la consultation a bien été envoyé au médecin")
          setTimeout(() => {
            this.rt.navigate(['/patient'])
          }, 500);
        })
     

  

    }
  }





  changerMedecin(idMedecin: number) {
    this.IdMed = idMedecin
    this.rt.navigate(['/patient/consulterMedecin'], { queryParams: { id: this.IdMed } })
    setTimeout(() => {
      location.reload();
    }, 1);
  }

  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.listSpecialites$ = this.specialiteService.getSpecialites()
  }

  // Récupère la liste des medecins via le service Medecin renvoie un Observable<Medecin[]>
  getList() {
    return this.medecinService.getMedecins()
  }
}
