import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { FicheMedicaleService } from './../../service/ficheMedicale/ficheMedicale.service';
import { FicheMedicale } from './../../model/FicheMedicale';
import { Consultation } from './../../model/Consultation';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../service/patient/patient.service';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-accueil-patient',
  templateUrl: './accueil-patient.component.html',
  styleUrls: ['./accueil-patient.component.scss']
})
export class AccueilPatientComponent implements OnInit {
  // Modal
  @ViewChild('infoConsultation') public modalInfoConsultation: ModalDirective;


  // Declaration des attributs
  // WIP plus besoin cf plus bas
  // id: string;
  patient: Patient;

  // Les fiches
  fichesMedicales: FicheMedicale[] = new Array();
  fichesSort: FicheMedicale[] = new Array();
  indiceFiche1: boolean = true;
  indiceFiche2: boolean = false;

  // Les Consultations
  consultations: Consultation[] = new Array();
  consultPasse: Consultation[] = new Array();
  consultValide: Consultation[] = new Array();
  consultVenir: Consultation[] = new Array();
  today: number = Date.now();
  numberDate: number;

  // Injection de PatientService pour en utiliser les fonctions
  constructor(
    private patientService: PatientService,
    private ficheService: FicheMedicaleService,
    private consultationService: ConsultationService,
    private authService: AuthentificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.patient = this.authService.getUser();

    // Recuperer les fiches medicales du patient
    // OK
    this.ficheService.getFichesByIdPatient(this.authService.getUserId()).subscribe(
      (data) => {
        this.fichesMedicales = data;
        console.log(this.fichesMedicales);
        if (this.fichesMedicales.length == 0) {
          // Message pour abscence de fiche
          this.indiceFiche1 = true;
          this.indiceFiche2 = false;
        } else if (this.fichesMedicales.length <= 5) {
          this.indiceFiche1 = false;
          this.indiceFiche2 = true;
          this.fichesSort = this.fichesMedicales;
        } else {
          this.indiceFiche1 = false;
          this.indiceFiche2 = true;
          this.fichesMedicales.sort();
          for (let i = 0; i < 5; i++) {
            this.fichesSort.push(this.fichesMedicales[i]);
          }
        }
      }
    )

    // Recuperer les consultations du patient
    // TODO -> Rajouter un limiteur de res
    this.consultationService.getConsultationsByIdPatient(this.authService.getUserId()).subscribe(
      (data) => {
        this.consultations = data;
        console.log(this.consultations);

        this.consultations.forEach(
          s => {
            this.numberDate = new Date(s.date).getTime();
            if (s.validationMedecin == false) {
              this.consultValide.push(s);
            } else if (s.validationMedecin == true && this.numberDate > this.today) {
              this.consultVenir.push(s);
            } else if (s.validationMedecin == true && this.numberDate < this.today) {
              this.consultPasse.push(s);
            }
          }
        )
      }
    )
  }

  // delete rdv
  deleteConsult(consult: Consultation) {
    this.consultationService.delete(consult.id).subscribe(
      (response) => {
        if(response.status == 200) {
          history.go(0)
        }
      },
      (erreur) => {console.log(erreur);}
    )
  }

  // MODAL -> INFO CONSULTATION




}
