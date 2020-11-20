import { Acte } from './../../model/Acte';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActeService {
  URL = 'http://localhost:'; // TODO mettre la bonne url
  // TODO a supprimer
  acte0 : Acte = {
    id:0,
    nom : "chirurgie Cardiaque",
    prix : 31.55
  }
  acte1 : Acte = {
    id:1,
    nom : "Carrie",
    prix : 31.55
  }
  acte2 : Acte = {
    id:2,
    nom : "Conusltation",
    prix : 31.55
  }
  acte3 : Acte = {
    id:3,
    nom : "visite médicale",
    prix : 31.55
  }
  listeActe : Acte[] = [this.acte0,this.acte1,this.acte2,this.acte3];
  // TODO fin a supprimer
constructor() { }
// Récupère un Acte avec son id 
  // TODO remplacer par l'appel au back
  getActe(id:number){
    return this.listeActe[id]
  }
  
  // Récupère la liste des Actes  
  // TODO remplacer par l'appel au back
  getActes(){
    console.log("hello from Acte service");
    return this.listeActe
  }

  // Enregistrer une nouvelle acte
  // TODO appel au back 
  save(acte:Acte) {
    // Verifier si l'acte existe déjà ou pas 
    // TODO if ...
    console.log(acte);
  }
}
