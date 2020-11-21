import { Specialite } from './../../model/Specialite';
import { Medecin } from './../../model/Medecin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/medecin'; // TODO mettre la bonne url

  // TODO à supprimer 
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

  medecina : Medecin = {
    id:0,
    username:"medecin0",
    nom:"string0",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    specialite: null,
    codePublic: "sqdsqdsq",
    activated:false,
    adresse:"",
    patients:null,
    consultations:null

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
    specialite: this.specialite3,
    codePublic: "sqdsqdsq",
    activated:false,
    adresse:"",
    patients:null,
    consultations:null
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
    specialite: this.specialite2,
    codePublic: "sqdsqdsq",
    activated:false,
    adresse:"",
    patients:null,
    consultations:null
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
    specialite: this.specialite3,
    codePublic: "sqdsqdsq",
    activated:false,
    adresse:"",
    patients:null,
    consultations:null
  };
  listeMedecin : Medecin[] = [this.medecina,this.medecinb,this.medecinc,this.medecind];
// TODO fin à supprimer
  medecins : Medecin[] = []
constructor(private http: HttpClient) { }

  // Récupère un medecin avec son id 
  // TODO remplacer par l'appel au back
  getMedecin(id:number){
    return this.listeMedecin[id]
  }
  
  // Récupère la liste des medecins  
  getMedecins(){
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.medecins = value));
  }
  
  // Sauvegarde un medecin en base 
  // TODO remplacer par l'appel au back
  save(medecin : Medecin) {
    console.log("hello from medecin service save methode");
    
    console.log(medecin);
     
  }


  // rajouter les autres appel au back 
}
