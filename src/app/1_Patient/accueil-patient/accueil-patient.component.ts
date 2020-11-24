import { FicheMedicaleService } from './../../service/ficheMedicale/ficheMedicale.service';
import { FicheMedicale } from './../../model/FicheMedicale';
import { Consultation } from './../../model/Consultation';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient/patient.service';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-accueil-patient',
  templateUrl: './accueil-patient.component.html',
  styleUrls: ['./accueil-patient.component.scss']
})
export class AccueilPatientComponent implements OnInit {
  // Declaration des attributs
  id: string;
  patient: Patient = new Patient();
  fichesMedicales: FicheMedicale[] = new Array();
  fichesSort: FicheMedicale[] = new Array();
  listRdv: Consultation[] = new Array();
  indiceFiche1: boolean = true;
  indiceFiche2: boolean = false;


  // Injection de PatientService pour en utiliser les fonctions
  constructor(
    private patientService: PatientService,
    private ficheService: FicheMedicaleService,
    private authService: AuthentificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recupPatient();

    // Recuperer les fiches medicales du patient
    // TODO
    this.ficheService.getFichesByIdPatient(this.patient.id).subscribe(
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


  }

  recupPatient() {
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id'] == null) {
        if (this.authService.isUserLoggedIn()) {
          this.id = this.authService.getUserId() // "+" pour convertir un string en number
        } else {
          this.router.navigate([''])
        }
      } else {
        this.id = param['id'];
      }
      this.patientService.getPatient(this.id).subscribe((value: any) => {
        this.patient = value.data;
      })
    })
  }







}
