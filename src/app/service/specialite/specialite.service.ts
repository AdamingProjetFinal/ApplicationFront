import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Specialite } from './../../model/Specialite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
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
  URL = 'http://localhost:5050/gestion-rdv-microservice/specialite'; // TODO mettre la bonne url
  specialites :Specialite[] = []
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

// Récupère une specialite avec son id 
  getSpecialite(id:string){
    return this.http
    .get<Specialite>(this.URL + '/' + id);
  }
  
  // Récupère la liste des specialites  
  getSpecialites(){
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.specialites = value));
  }

  // Sauvegarde un specialite en base 
  save(specialite : Specialite) {
    return this.http.post(this.URL , specialite, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un specialite en base 
  update(specialite: Specialite) {
    return this.http.put(this.URL, specialite, { observe: 'response' });
  }

  // Suppression d'un specialite en base
  delete(id: any) {
    return this.http.delete(this.URL + '/' + id);
  }
}
