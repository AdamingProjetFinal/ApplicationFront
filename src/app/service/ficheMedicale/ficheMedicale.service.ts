import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheMedicale } from '../../model/FicheMedicale';

@Injectable({
  providedIn: 'root'
})
export class FicheMedicaleService {

  URL = 'http://localhost:5050/gestion-rdv-microservice/ficheMedicale'; // TODO mettre la bonne url
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

save(ficheMedicale: FicheMedicale): Observable<HttpResponse<Object>> {
  return this.http.post<FicheMedicale>(this.URL, ficheMedicale, { headers: this.headers, observe: 'response' });
}

getFiche(id: number): Observable<FicheMedicale> {
  return this.http.get<FicheMedicale>(this.URL + "/" + id);
}

getFiches(): Observable<FicheMedicale> {
  return this.http.get<FicheMedicale>(this.URL + "/all");
}

update(ficheMedicale: FicheMedicale): Observable<HttpResponse<Object>> {
  return this.http.put<FicheMedicale>(this.URL + "/", ficheMedicale, {observe: "response"});
}

delete(id: number) {
  return this.http.delete(this.URL, {observe: "response"});
}



}
