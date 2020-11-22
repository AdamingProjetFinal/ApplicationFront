import { Specialite } from './../../model/Specialite';
import { Medecin } from './../../model/Medecin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/medecin'; // TODO mettre la bonne url

  medecins : Medecin[] = []
  medecin: Medecin = new Medecin
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

  // Récupère un medecin avec son id 
  getMedecin(id:string){
    return this.http
    .get<Medecin>(this.URL + '/' + id);
  }
  
  // Récupère la liste des medecins  
  getMedecins(){
    return this.http
          .get<Medecin[]>(this.URL + '/all')
          .pipe(map(value => this.medecins = value));
  }
  
  // Sauvegarde un medecin en base 
  save(medecin : Medecin) {
    return this.http.post(this.URL , medecin, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un medecin en base 
  update(medecin: Medecin) {
    return this.http.put(this.URL, medecin, { observe: 'response' });
  }

  // Suppression d'un medecin en base
  delete(id: any) {
    return this.http.delete(this.URL + '/' + id);
  }

  // TODO rajouter les autres appel au back 
}
