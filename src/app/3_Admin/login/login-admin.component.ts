import { AuthentificationService } from '../../service/authentification/authentification.service';
import { Component } from '@angular/core';

@Component({ 
  selector: 'app-loginAdmin',
  templateUrl: 'login-admin.component.html'
})
export class LoginAdminComponent { 
  login:string;
  password:string;

  invalidLogin = false;

  constructor(private authentificationService :AuthentificationService){}
ngOnInit(){}

// Se connecter en cherchant l'association email/password dans la table Medecin
loginMedecin(){
  let resp = this.authentificationService.authentification(this.login, this.password, "admin")
  console.log("connexion : " + resp);
    }

}
