import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Reponse } from './../../model/Reponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  URL = 'http://localhost:5050/gestion-admin-microservice/ReponseStatic'; 
  headers = new HttpHeaders({'Content-Type': 'application/json'})
  reponses: Reponse[];
constructor(private http: HttpClient) { }
// Récupère une Reponse avec son id 
getReponse(id:string) : Observable<Reponse>{
  return this.http
  .get<Reponse>(this.URL + '/' + id);
}

// Récupère la liste des Reponses  
getReponses() : Observable<Reponse[]>{
  return this.http
        .get<any[]>(this.URL + '/all')
        .pipe(map(value => this.reponses = value));
}

// Sauvegarde un reponse en base 
save(reponse : Reponse) :Observable<HttpResponse<Object>>{
  return this.http.post(this.URL , reponse, { headers: this.headers, observe: 'response' }).pipe()
}

// Mise à jour d'un reponse en base 
update(reponse: Reponse) : Observable<HttpResponse<Object>>{
  return this.http.put(this.URL, reponse, { observe: 'response' });
}

// Suppression d'un reponse en base
delete(id: any) : Observable<Object>{
  return this.http.delete(this.URL + '/' + id);
}
}
