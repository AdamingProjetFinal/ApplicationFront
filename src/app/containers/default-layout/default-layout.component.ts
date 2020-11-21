import { AlerteService } from './../../service/alerte/alerte.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Router } from '@angular/router';
import {Component} from '@angular/core';
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
  public isUserLoggedIn : boolean;
  public profil:string
  alertsDismiss: any = [];
  public navItems = navItems;
  constructor(private router: Router,
    private authentificationService :AuthentificationService,
    private alerteService: AlerteService){}

ngOnInit(){
  this.getLoggedIn()
  this.getProfilUrl()

}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  // instancie l'url du profil de l'utilisateur
  getProfilUrl(){
    this.profil = "#/" + this.authentificationService.getType() + "/update"
  }

  // Verifier si un utilisateur est connecté
  getLoggedIn() {
    this.isUserLoggedIn = this.authentificationService.isUserLoggedIn()
  }

  // TODO a supprimer permet de se connecter en un clic
  fackloginMedecin(){
    this.authentificationService.authentification("string", "string", "medecin")
      this.getLoggedIn()
  }
  
  // TODO a supprimer permet de se connecter en un clic
  fackloginPatient(){
    this.authentificationService.authentification("string", "string", "patient")
    this.getLoggedIn()
  }
  // permet de se déconnecter depuis le service d'authentification
  logout(){
    this.authentificationService.logOut()
    this.getLoggedIn()
    this.alerteService.error("Déconnexion")
  }

}
