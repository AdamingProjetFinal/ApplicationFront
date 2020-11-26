
import { Subscription } from 'rxjs';
import { PatientService } from './../../service/patient/patient.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { AlerteService } from './../../service/alerte/alerte.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AlertConfig } from 'ngx-bootstrap/alert';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public isUserLoggedIn: boolean;
  public profil: string
  alertsDismiss: any = [];
  public navItems= navItems;
  anonyme = true // TODO a supprimer
  patient = false // TODO a supprimer
  medecin = false // TODO a supprimer
  constructor(private router: Router,
    private authentificationService: AuthentificationService,
    private alerteService: AlerteService,
    private medecinService: MedecinService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.getLoggedIn()
    this.getProfilUrl()
    switch (this.authentificationService.getType()) {
      case "patient":
        this.anonyme = false // TODO a supprimer
        this.patient = true // TODO a supprimer
        this.medecin = false // TODO a supprimer
        break;
      case "medecin":
        this.anonyme = false // TODO a supprimer
        this.patient = false // TODO a supprimer
        this.medecin = true // TODO a supprimer
        break;
      default:
        this.anonyme = true // TODO a supprimer
        this.patient = false // TODO a supprimer
        this.medecin = false // TODO a supprimer
        break;
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  // instancie l'url du profil de l'utilisateur
  getProfilUrl() {
    this.profil = "#/" + this.authentificationService.getType() + "/update"
  }

  // Verifier si un utilisateur est connecté
  getLoggedIn() {
    this.isUserLoggedIn = this.authentificationService.isUserLoggedIn()
  }

  // TODO a supprimer permet de se connecter en un clic essayer de comprendre pourquoi il y a un probleme de synchronisation
  fackloginMedecin() {
    this.medecinService.getMedecins().subscribe(medecins => {
      this.authentificationService.authentification(medecins[0].email, medecins[0].password, "medecin")
      this.getLoggedIn()
      this.anonyme = false // TODO a supprimer
      this.patient = false // TODO a supprimer
      this.medecin = true // TODO a supprimer
    })    
  }

  // TODO a supprimer permet de se connecter en un clic
  fackloginPatient() {
    this.patientService.getPatients().subscribe(patients => {
      this.authentificationService.authentification(patients[0].email, patients[0].password, "patient")
      this.getLoggedIn()
      this.anonyme = false // TODO a supprimer
      this.patient = true // TODO a supprimer
      this.medecin = false // TODO a supprimer
    })
  }
  // permet de se déconnecter depuis le service d'authentification
  logout() {
    this.authentificationService.logOut()
    this.getLoggedIn()
    this.alerteService.error("Déconnexion")
    this.anonyme = true // TODO a supprimer
    this.patient = false // TODO a supprimer
    this.medecin = false // TODO a supprimer
  }

}
