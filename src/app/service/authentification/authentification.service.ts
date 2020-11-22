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
  medecin : Medecin = new Medecin
  patient : Patient = new Patient
  bool: boolean
  constructor(private medecinService : MedecinService,
    private patientService: PatientService,
    private alerteService : AlerteService,
    private router: Router) { }
    
  // Vérification du mot de passe
  authentification(email: string, password: string, type: string): boolean {
    switch (type) {
      case "medecin": {
        console.log("Connexion en tant que medecin");
        
        this.medecinService.getMedecin("1").subscribe((value: any) => { // TODO remplacer par la recherche par email
          this.medecin = value.data
        })
            if (this.medecin.password === password){
              sessionStorage.setItem('type', "medecin");
              sessionStorage.setItem('user', JSON.stringify(this.medecin))
              this.router.navigate(['/'])
              this.bool = true;
            } else {
              this.bool = false
            }
            return this.bool
          }
          case "patient": {
            console.log("Connexion en tant que patient");
            
            this.patientService.getPatient("1").subscribe((value: any) => { // TODO remplacer par la recherche par email et par patient
              console.log("depuis get patient")
              console.log(this.patient = value.data)
              console.log("password")
              console.log(password)
              console.log("this.patient.password")
              console.log(this.patient.password)
              console.log("this.patient.password == password" )
              console.log(this.patient.password == password)
              if (this.patient.password === password){
                sessionStorage.setItem('user', JSON.stringify(this.patient))// TODO remplacer par la recherche par email et par patient
                sessionStorage.setItem('type', "patient");
                this.router.navigate(['/'])
            this.bool = true;
          } else {
            this.bool = false
          }
        })

            
        return this.bool
      }
    }
  }

// Vérifie si un utilisateur est connecté
isUserLoggedIn() {
  return !(sessionStorage.getItem('user') == null);
}

// Récupère l'Id de l'utilisateur
getUserId(){
  let user = JSON.parse(sessionStorage.getItem('user'))
  
  return user.id
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
isPatient():boolean{
  return sessionStorage.getItem('type') == 'patient'
}

// récuperer l'utilisateur
getUser(){
  return JSON.parse(sessionStorage.getItem('user'))
}
}
