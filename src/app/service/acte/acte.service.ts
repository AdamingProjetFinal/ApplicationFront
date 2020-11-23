import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acte } from './../../model/Acte';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActeService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/act'; // TODO mettre la bonne url

  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }
save(acte: Acte) : Observable<HttpResponse<Object>>{
  return this.http.post(this.URL, acte, { headers: this.headers, observe: 'response' });
}

getActe(id: number): Observable<Acte> {
  return this.http.get<Acte>(this.URL + "/" + id);
}

getActes(): Observable<Acte[]> {
  return this.http.get<Acte[]>(this.URL + "/all");
}

update(acte: Acte): Observable<HttpResponse<Object>> {
  return this.http.put<Acte>(this.URL, acte, { observe: 'response' });
}

delete(id: number) {
  return this.http.delete(this.URL + '/' + id, {observe: "response"});
}
}
