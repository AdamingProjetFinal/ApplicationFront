import { Router, ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MedecinService } from './../../service/medecin/medecin.service';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { Specialite } from './../../model/Specialite';
import { Observable, combineLatest } from 'rxjs';
import { Medecin } from './../../model/Medecin';
import { FormControl } from '@angular/forms';
import { PatientService } from './../../service/patient/patient.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { Consultation } from './../../model/Consultation';
import { Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-consulter-medecin',
  templateUrl: './consulter-medecin.component.html',
  styleUrls: ['./consulter-medecin.component.css']
})
export class ConsulterMedecinComponent implements OnInit {



  IdMed = 1

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
     this.getSepcialites();
  }
 
  changerMedecin(idMedecin: number) {
    this.IdMed = idMedecin
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
