import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  email:string;
  password:string;

  invalidLogin = false;

  constructor(private authentificationService :AuthentificationService){}
ngOnInit(){}

// Se connecter en cherchant l'association email/password dans la table Medecin
loginMedecin(){
  this.authentificationService.authentification(this.email, this.password, "medecin")
    }
    
// Se connecter en cherchant l'association email/password dans la table Patient
loginPatient(){
  this.authentificationService.authentification(this.email, this.password, "patient")
}

}
