import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Formule } from './../../model/Formule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {
  URL = 'http://localhost:5050/gestion-admin-microservice/Formule'; 
  headers = new HttpHeaders({'Content-Type': 'application/json'})
  formules: Formule[];
constructor(private http: HttpClient) { }

// Récupère une Formule avec son id 
  getFormule(id:string) : Observable<Formule>{
    return this.http
    .get<Formule>(this.URL + '/' + id);
  }
  
  // Récupère la liste des Formules  
  getFormules() : Observable<Formule[]>{
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.formules = value));
  }

  // Sauvegarde un formule en base 
  save(formule : Formule) :Observable<HttpResponse<Object>>{
    return this.http.post(this.URL , formule, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un formule en base 
  update(formule: Formule) : Observable<HttpResponse<Object>>{
    return this.http.put(this.URL, formule, { observe: 'response' });
  }

  // Suppression d'un formule en base
  delete(id: any) : Observable<Object>{
    return this.http.delete(this.URL + '/' + id);
  }
}

