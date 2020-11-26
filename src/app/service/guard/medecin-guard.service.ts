import { AuthentificationService } from '../authentification/authentification.service';
import { AutorisationService } from '../autorisation/autorisation.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedecinGuardService implements CanActivate  {

constructor(
  private auth: AutorisationService,
  private authentificationService: AuthentificationService,
  private router :Router) { }

canActivate(route: ActivatedRouteSnapshot) {
  console.log("hello from guard");
  
  console.log(route.data);
  if (this.authentificationService.getType() == "medecin") {
    return true;
  }
  this.router.navigate(['/login']);
  return false
}

}
