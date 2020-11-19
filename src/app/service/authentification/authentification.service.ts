import { MedecinService } from './../medecin/medecin.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../../model/Medecin';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

constructor(private medecinService : MedecinService) { }

authenticate(email: any, password: any): Medecin {
  var medecin: Medecin = new Medecin()
  medecin.email="blablabla"
  medecin.password="azeaze"
  // TODO revoyer l'utilisateur connecté
  return medecin;
}
isUserLoggedIn() {
  const email = sessionStorage.getItem('email');
  return !(email === null);
}

logOut() {
  console.log("déconnexion");
  
  sessionStorage.removeItem('email');  
}
}
