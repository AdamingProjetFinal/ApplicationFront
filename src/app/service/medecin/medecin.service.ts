import { Medecin } from './../../model/Medecin';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
constructor() { }
  getMedecin():Medecin{
    var medecin :Medecin = new Medecin()
    medecin.id = 5
    medecin.nom = "jean"
    return medecin
  }
}
