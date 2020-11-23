import { map } from 'rxjs/operators';
import { Comptabilite } from './../../model/Comptabilite';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComptabiliteService {
  URL = 'http://localhost:5050/gestion-admin-microservice/Comptabilite'; 
  headers = new HttpHeaders({'Content-Type': 'application/json'})
  comptabilites: Comptabilite[];
constructor(private http: HttpClient) { }

// Récupère une Comptabilite avec son id 
  getComptabilite(id:string) : Observable<Comptabilite>{
    return this.http
    .get<Comptabilite>(this.URL + '/' + id);
  }
  
  // Récupère la liste des Comptabilites  
  getComptabilites() : Observable<Comptabilite[]>{
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.comptabilites = value));
  }

  // Sauvegarde un comptabilite en base 
  save(comptabilite : Comptabilite) :Observable<HttpResponse<Object>>{
    return this.http.post(this.URL , comptabilite, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un comptabilite en base 
  update(comptabilite: Comptabilite) : Observable<HttpResponse<Object>>{
    return this.http.put(this.URL, comptabilite, { observe: 'response' });
  }

  // Suppression d'un comptabilite en base
  delete(id: any) : Observable<Object>{
    return this.http.delete(this.URL + '/' + id);
  }
}
