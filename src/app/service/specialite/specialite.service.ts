import { HttpClient } from '@angular/common/http';
import { Specialite } from './../../model/Specialite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  URL = 'http://localhost:'; // TODO mettre la bonne url
  specialite0 : Specialite = {
    idSpecialite:0,
    nom:"medecin traitant"
  }
  specialite1 : Specialite = {
    idSpecialite:1,
    nom:"dentiste"
  }
  specialite2 : Specialite = {
    idSpecialite:2,
    nom:"Orthophoniste"
  }
  specialite3 : Specialite = {
    idSpecialite:3,
    nom:"chirurgien"
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
    console.log("hello from specialite service");
    return this.listeSpecialite
  }

  // Enregistrer une nouvelle spécialité
  // TODO appel au back 
  save(spe:Specialite) {
    // Verifier si le spécialite existe déjà ou pas 
    // TODO if ...
    console.log(spe);
  }
   // rajouter les autres appel au back
}
