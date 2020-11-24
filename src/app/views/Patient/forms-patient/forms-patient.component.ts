import { AlerteService } from './../../../service/alerte/alerte.service';
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
  id:string
  patient:Patient = new Patient

  constructor(private patientService : PatientService,
              private activatedRoute : ActivatedRoute, 
              private authentificationService : AuthentificationService,
              private router : Router,
              private alerteService: AlerteService) { }


  ngOnInit() {
    this.recuperationPatient()
  }


  // Permet de récupérer l'id contenu dans l'url, Si il n'y en a pas c'est l'id de l'utilisateur courant qui est pris
  recuperationPatient() {
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id'] == null) {
        if (this.authentificationService.isUserLoggedIn()) {
          this.id = this.authentificationService.getUserId() // "+" pour convertir un string en number
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

  update() : void{
    this.patientService.update(this.patient).subscribe(response => {
      if (response.status == 200) {
        this.alerteService.success("Le profil a bien été mis a jour")
      } else {
        this.alerteService.error("Le profil n'a pas pu être mis a jour")
      }
    
    });
  }

  delete(){
    this.patientService.delete(this.patient.id).subscribe((response : any)=> {
      if (response.status == "OK") {
        this.alerteService.error("Le profil a bien été supprimé")
        this.router.navigate([''])
      } else {
        this.alerteService.error("Erreur lors de la suppression du compte")
      }
    });
  }

  annuler(){
    this.router.navigate(['']);
  }

    

}
