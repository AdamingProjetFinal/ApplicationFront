import { observable, Observable } from 'rxjs';
import { Patient } from './../../model/Patient';
import { PatientService } from './../patient/patient.service';
import { Medecin } from './../../model/Medecin';
import { DefaultLayoutComponent } from './../../containers/default-layout/default-layout.component';
import { Router } from '@angular/router';
import { MedecinService } from './../medecin/medecin.service';
import { Injectable } from '@angular/core';
import { AlerteService } from '../alerte/alerte.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  medecin: Medecin = new Medecin
  patient: Patient = new Patient
  constructor(private medecinService: MedecinService,
    private patientService: PatientService,
    private alerteService: AlerteService,
    private router: Router) { }

  // Vérification du mot de passe
  authentification(email: string, password: string, type: string) {
    switch (type) {
      case "medecin": {
        console.log("Connexion en tant que medecin");
        this.medecinService.getMedecinByEmail(email).subscribe((value: any) => { // TODO remplacer par la recherche par email
          this.medecin = value.data
          if (this.medecin.password === password) {
            sessionStorage.setItem('type', "medecin");
            sessionStorage.setItem('user', JSON.stringify(this.medecin))
            this.router.navigate(['/'])
          } else {
          }
        })
        break
      }
      case "patient": {
        console.log("Connexion en tant que patient");
        this.patientService.getPatientByEmail(email).subscribe((value: any) => {
          this.patient = value.data
          if (this.patient.password === password) {
            sessionStorage.setItem('user', JSON.stringify(this.patient))
            sessionStorage.setItem('type', "patient");
            this.router.navigate(['/'])
          } else {
            this.alerteService.error("Echec de la connexion")
          }
        })
        break
      }
    }
  }

  // modifie les données de l'utilisateur courant
  updateCurrentUser(user : any){
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  // Vérifie si un utilisateur est connecté
  isUserLoggedIn() {
    return !(sessionStorage.getItem('user') == null);
  }

  // Récupère l'Id de l'utilisateur  //TODO à supprimer ?
  getUserId() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user != null) {
       
      return user.id
    } else {
      
      return 1 // TODO voir ce qu'on fait si pas de user
    }
  }

  // Méthode permettant de se déconnecter
  logOut() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('type');
    this.router.navigate([''])
  }
  // récuperer le type d'utilisateur
  getType() {
    return sessionStorage.getItem('type')
  }

  // Vérifier si l'utilisateur est un patient
  isPatient(): boolean {
    return sessionStorage.getItem('type') == 'patient'
  }

  // récuperer l'utilisateur
  getUser() {
    return JSON.parse(sessionStorage.getItem('user'))
  }
}
