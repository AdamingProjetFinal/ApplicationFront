import { Medecin } from './../../model/Medecin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  URL = 'http://localhost:'; // TODO mettre la bonne url
  medecina : Medecin = {
    id:0,
    username:"medecin0",
    nom:"string0",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    specialite: 321,
    codePublic: "sqdsqdsq"

  };
  medecinb : Medecin = {
    id:1,
    username:"medecin1",
    nom:"string1",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    specialite: 321,
    codePublic: "sqdsqdsq"
  };
  medecinc : Medecin = {
    id:2,
    username:"medecin2",
    nom:"string2",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    specialite: 321,
    codePublic: "sqdsqdsq"
  };
  medecind : Medecin = {
    id:3,
    username:"medecin3",
    nom:"string3",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    specialite: 321,
    codePublic: "sqdsqdsq"
  };
  listeMedecin : Medecin[] = [this.medecina,this.medecinb,this.medecinc,this.medecind];

constructor(private http: HttpClient) { }

  // Récupère un medecin avec son id 
  // TODO remplacer par l'appel au back
  getMedecin(id:number){
    return this.listeMedecin[id]
  }
  
  // Récupère la liste des medecins  
  // TODO remplacer par l'appel au back
  getMedecins(){
    return this.listeMedecin
  }
  
  // rajouter les autres appel au back 
}