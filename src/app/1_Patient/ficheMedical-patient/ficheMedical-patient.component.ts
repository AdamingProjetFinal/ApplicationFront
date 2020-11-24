import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheMedicale } from '../../model/FicheMedicale';
import { Patient } from '../../model/Patient';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { FicheMedicaleService } from '../../service/ficheMedicale/ficheMedicale.service';
import { PatientService } from '../../service/patient/patient.service';

@Component({
  selector: 'app-ficheMedical-patient',
  templateUrl: './ficheMedical-patient.component.html',
  styleUrls: ['./ficheMedical-patient.component.scss']
})
export class FicheMedicalPatientComponent implements OnInit {
  // Declaration des attributs
  id: string;
  patient: Patient = new Patient();

  // Les fiches
  fichesMedicales: FicheMedicale[] = new Array();
  fichesSort: FicheMedicale[] = new Array();
  indiceFiche1: boolean = true;
  indiceFiche2: boolean = false;

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
      (data) => { this.fichesMedicales = data;
        console.log(this.fichesMedicales);
        if(this.fichesMedicales.length == 0) {
          // Message pour abscence de fiche
          this.indiceFiche1 = true;
          this.indiceFiche2 = false;
        } else {
          this.indiceFiche1 = false;
          this.indiceFiche2 = true;
          this.fichesSort = this.fichesMedicales;
        } 
      }
    )
  }

  recupPatient() {
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id'] == null) {
        if (this.authService.isUserLoggedIn()) {
          this.id = this.authService.getUserId() // "+" pour convertir un string en number
        }else {
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
