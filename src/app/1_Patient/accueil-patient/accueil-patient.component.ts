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
  listRdv: Consultation[];
  listFiche: FicheMedicale[];
  


  // Injection de PatientService pour en utiliser les fonctions
  constructor(
    private patientService: PatientService, 
    private authService: AuthentificationService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
      this.recupPatient();
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
