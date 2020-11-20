import { HttpClient } from '@angular/common/http';
import { Specialite } from './../../model/Specialite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  URL = 'http://localhost:'; // TODO mettre la bonne url
  specialite0 : Specialite = {
    id:0,
    nomSpe:"medecin traitant"
  }
  specialite1 : Specialite = {
    id:1,
    nomSpe:"dentiste"
  }
  specialite2 : Specialite = {
    id:2,
    nomSpe:"Orthophoniste"
  }
  specialite3 : Specialite = {
    id:3,
    nomSpe:"chirurgien"
  }
  listeSpecialite : Specialite[] = [this.specialite0,this.specialite1,this.specialite2,this.specialite3];

constructor(private http: HttpClient) { }

// Récupère une specialite avec son id 
  // TODO remplacer par l'appel au back
  getSpecialite(id:number){
    return this.listeSpecialite[id]
  }
  
  // Récupère la liste des specialites  
  // TODO remplacer par l'appel au back
  getSpecialites(){
    return this.listeSpecialite
  }

   // rajouter les autres appel au back
}
