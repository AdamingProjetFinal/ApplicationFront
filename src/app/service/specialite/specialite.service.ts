import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Specialite } from './../../model/Specialite';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/specialite'; 
  specialites :Specialite[] = []
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

// Récupère une specialite avec son id 
  getSpecialite(id:string) : Observable<Specialite>{
    return this.http
    .get<Specialite>(this.URL + '/' + id);
  }
  
  // Récupère la liste des specialites  
  getSpecialites() : Observable<Specialite[]>{
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.specialites = value));
  }

  // Sauvegarde un specialite en base 
  save(specialite : Specialite) :Observable<HttpResponse<Object>>{
    return this.http.post(this.URL , specialite, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un specialite en base 
  update(specialite: Specialite) : Observable<HttpResponse<Object>>{
    return this.http.put(this.URL, specialite, { observe: 'response' });
  }

  // Suppression d'un specialite en base
  delete(id: any) : Observable<Object>{
    return this.http.delete(this.URL + '/' + id);
  }
}
