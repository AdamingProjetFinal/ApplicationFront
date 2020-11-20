import { AuthentificationService } from './../../../service/authentification/authentification.service';
import { Patient } from './../../../model/Patient';
import { PatientService } from '../../../service/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-patient',
  templateUrl: './forms-patient.component.html',
  styleUrls: ['./forms-patient.component.scss']
})
export class FormsPatientComponent implements OnInit {
  id:number
  patient:Patient

  constructor(private patientService : PatientService,
              private activatedRoute : ActivatedRoute, 
              private authentificationService : AuthentificationService,
              private router : Router) { }


  ngOnInit() {
    this.recuperationPatient()
  }


  // Permet de récupérer l'id contenu dans l'url, Si il n'y en a pas c'est l'id de l'utilisateur courant qui est pris
  recuperationPatient() {
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id'] == null) {
        if (this.authentificationService.isUserLoggedIn()) {
          this.id = +this.authentificationService.getUserId() // "+" pour convertir un string en number
        }else {
          this.router.navigate([''])
        }
      } else {
        this.id = param['id'];
      }
      this.patient = this.patientService.getPatient(this.id)
    })
  }

    

}
