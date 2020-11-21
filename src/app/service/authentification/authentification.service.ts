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
  
  constructor(private medecinService : MedecinService,
    private alerteService : AlerteService,
    private router: Router) { }
    
    // Vérification du mot de passe
    authentification(email: string, password: string, type: string): boolean {
      switch (type) {
        case "medecin": {
          console.log("Connexion en tant que medecin");
          let medecin = this.medecinService.getMedecin(1) // TODO remplacer par la recherche par email
          if (medecin.password === password){
        sessionStorage.setItem('email',email);
        sessionStorage.setItem('id', medecin.id.toString());
        sessionStorage.setItem('type', "medecin");
        // sessionStorage.setItem('user', JSON.stringify(medecin))
        // let user : Medecin = JSON.parse(sessionStorage.getItem('user'))
        this.router.navigate([''])
        // console.log(user);
        return true;
      } else {
        return false
      }
    }
    case "patient": {
      console.log("Connexion en tant que patient");
      let medecin = this.medecinService.getMedecin(1) // TODO remplacer par le service de patient et la recherche par email
      if (medecin.password === password){
        sessionStorage.setItem('email',email);
        sessionStorage.setItem('id', medecin.id.toString()); // TODO remplacer par le patient
        sessionStorage.setItem('type', "patient");
        this.router.navigate([''])
        console.log(sessionStorage);
        return true;
      } else {
        return false
      }
    }
  }
}

// Vérifie si un utilisateur est connecté
isUserLoggedIn() {
  const email = sessionStorage.getItem('email');
  return !(email === null);
}

// Récupère l'Id de l'utilisateur
getUserId(){
  console.log(+sessionStorage.getItem('id'));
  
  return sessionStorage.getItem('id')
}

// Méthode permettant de se déconnecter
logOut() {
  console.log("déconnexion");
  this.alerteService.error("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh",true)
  sessionStorage.removeItem('email');  
  this.router.navigate([''])
}
getType() {
  return sessionStorage.getItem('type')
}
}
