import { Medecin } from './../../model/Medecin';
import { MedecinService } from './../../service/medecin/medecin.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  email="sqddsqsqd";
  password="sqsqdsqd";
  invalidLogin = false;
  constructor(private router: Router,
              private authentificationService :AuthentificationService,
              private medecinService : MedecinService){}
ngOnInit(){}

checkLogin(){
  var resp : Medecin = new Medecin()
  resp = this.authentificationService.authenticate(this.email, this.password) 
  // (
  //   resp => {
      if (resp.password === this.password){
        sessionStorage.setItem('email',this.email);
        this.router.navigate([''])
        console.log(sessionStorage);
        
      } else {
        this.invalidLogin = true;
      }
  //   }
  // )
}

}
