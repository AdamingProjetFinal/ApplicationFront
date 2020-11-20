import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Router } from '@angular/router';
import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public isUserLoggedIn : boolean;
  public profil:string
  public navItems = navItems;
  constructor(private router: Router,
    private authentificationService :AuthentificationService){}

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
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

  fackloginPatient(){
    this.authentificationService.authentification("string", "string", "patient")
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }
  // permet de se déconnecter depuis le service d'authentification
  logout(){
    this.authentificationService.logOut()
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }
}
