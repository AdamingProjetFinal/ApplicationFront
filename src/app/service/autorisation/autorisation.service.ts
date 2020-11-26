import { AuthentificationService } from './../authentification/authentification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

constructor( private authentificationService:AuthentificationService) { }
public isAuthorised(roles: string[]): boolean {
  const currentTypeUser = this.authentificationService.getType();
  if (!currentTypeUser) return false;
  return (roles.indexOf(currentTypeUser) >= 0)
}
}
