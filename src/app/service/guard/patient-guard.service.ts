import { AuthentificationService } from '../authentification/authentification.service';
import { AutorisationService } from '../autorisation/autorisation.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientGuardService implements CanActivate  {

constructor(
  private auth: AutorisationService,
  private authentificationService: AuthentificationService,
  private router :Router) { }

canActivate(route: ActivatedRouteSnapshot) {
  
  if (this.authentificationService.getType() == "patient") {
    return true;
  }
  this.router.navigate(['/login']);
  return false
}

}
