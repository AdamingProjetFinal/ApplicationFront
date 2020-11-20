import { HttpClient } from '@angular/common/http';
import { Patient } from './../../model/Patient';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  URL = 'http://localhost:'; // TODO mettre la bonne url
  patienta : Patient = {
    id:0,
    username:"patient0",
    nom:"string0",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    numeroSecu: "321",
    medecinTraitant: 1

  };
  patientb : Patient = {
    id:1,
    username:"patient1",
    nom:"string1",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    numeroSecu: "321",
    medecinTraitant: 1
  };
  patientc : Patient = {
    id:2,
    username:"patient2",
    nom:"string2",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    numeroSecu: "321",
    medecinTraitant: 1
  };
  patientd : Patient = {
    id:3,
    username:"patient3",
    nom:"string3",
    prenom:"string",
    email:"string",
    password:"string",
    dateNaissance: new Date(),
    telephone:"string",
    numeroSecu: "321",
    medecinTraitant: 1
  };
  listepatient : Patient[] = [this.patienta,this.patientb,this.patientc,this.patientd];

constructor(private http: HttpClient) { }

// Récupère un patient avec son id 
  // TODO remplacer par l'appel au back
  getPatient(id:number){
    return this.listepatient[id]
  }
  
  // Récupère la liste des patients  
  // TODO remplacer par l'appel au back
  getPatients(){
    return this.listepatient
  }

  // Sauvegarde un patient en base 
  // TODO remplacer par l'appel au back
  save(patient : Patient) {
    console.log("hello from patient service save methode");
    
    console.log(patient);
     
  }
   // rajouter les autres appel au back
}
