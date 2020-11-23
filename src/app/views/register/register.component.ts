import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlerteService } from './../../service/alerte/alerte.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import {Md5} from "md5-typescript";
import { PatientService } from './../../service/patient/patient.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { Specialite } from './../../model/Specialite';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { Medecin } from './../../model/Medecin';
import { Patient } from './../../model/Patient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ModalDirective } from 'ngx-bootstrap/modal';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
  @ViewChild('myModal') public myModal: ModalDirective
  medecin : Medecin = new Medecin
  patient : Patient = new Patient
  checkPassword : string
  alertHtmlMedecin: any = [];
  alertHtmlPatient: any = [];
  listSpecialites: Specialite[];
  specialiteId : number;
  constructor(private specialiteService : SpecialiteService,
    private medecinService: MedecinService,
    private patientService: PatientService,
    private router: Router,
    private authentificationService : AuthentificationService,
    private alerteService: AlerteService) { }

  ngOnInit() {
    this.getSepcialites()
  }

  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.specialiteService.getSpecialites().subscribe(specialite => {
      this.listSpecialites = specialite as Specialite[]      
    })
  }


  // sauvegarde d'un medecin
  saveMedecin() : void{
    if (this.medecin.password == this.checkPassword) {
      // this.medecin.password = Md5.init(this.medecin.password); // TODO décommenter pour chiffrer les mots de passes en base
      this.medecin.specialite = this.listSpecialites.find(specialite => specialite.idSpecialite == this.specialiteId)
      console.log(this.medecin);
      
      this.medecinService.save(this.medecin).subscribe(response => response.body);
      this.authentificationService.authentification(this.medecin.email,this.medecin.password,'medecin')
    } else {
      this.alerteService.error("Les mots de passe doivent être identiques")
    }
  }

  // sauvegarde d'un patient
  savePatient() : void{
    console.log(this.patient);
    if (this.patient.password == this.checkPassword) {
      this.patientService.save(this.patient).subscribe(response => response.body);
      this.authentificationService.authentification(this.patient.email,this.patient.password,'patient')
    } else {
      this.alerteService.error("Les mots de passe doivent être identiques")
    }
  }

  addAlert(typeAlert:string,msgAlert:string,user:string): void {
    switch (user) {
      case "patient":
        this.alertHtmlPatient = {
          type: typeAlert,
          msg: msgAlert
        };
        break;
        case "medecin":
          this.alertHtmlMedecin = {
            type: typeAlert,
            msg: msgAlert
          };
          break;
      default:
        break;
    }
  }

  // validation de la modal
  validationModal(){
    this.getSepcialites()
    this.myModal.hide()
  }
}
