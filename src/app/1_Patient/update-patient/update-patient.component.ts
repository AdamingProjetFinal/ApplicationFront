import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../model/Patient';
import { AlerteService } from '../../service/alerte/alerte.service';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { PatientService } from '../../service/patient/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {
  // Declaration des attributs
  id: string;
  patient: Patient = new Patient();
  
  constructor(
    private patientService: PatientService,
    private activatedRoute : ActivatedRoute, 
    private authService : AuthentificationService,
    private router : Router,
    private alerteService: AlerteService
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

}
