import { Medecin } from './../../model/Medecin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  URL = 'http://localhost:8082/apiHealthProfessional';
  medecina : Medecin = {
    id:0,
    username:"string",
    nom:"string0",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string"
  };
  medecinb : Medecin = {
    id:1,
    username:"string",
    nom:"string1",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string"
  };
  medecinc : Medecin = {
    id:2,
    username:"string",
    nom:"string2",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string"
  };
  medecind : Medecin = {
    id:3,
    username:"string",
    nom:"string3",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string"
  };
  listeMedecin : Medecin[] = [this.medecina,this.medecinb,this.medecinc,this.medecind];

constructor(private http: HttpClient) { }

  // Récupère un medecin avec son id 
  getMedecin(id:number){
    return this.listeMedecin[id]
  }

  // Récupère la liste des medecins  
  getMedecins(){
    return this.listeMedecin
  }
  
}
