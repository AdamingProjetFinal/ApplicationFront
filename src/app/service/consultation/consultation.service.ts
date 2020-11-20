import { Observable } from 'rxjs';
import { Consultation } from './../../model/Consultation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// TODO 
export class ConsultationService {
  URL = 'http://localhost:5050/gestion-rdv-microservice'; // TODO mettre la bonne url

constructor(private http: HttpClient) { }

save(consultation: Consultation): Observable<Consultation> {
  return this.http.post<Consultation>(URL + "/", consultation);
}

getByID(id: number): Observable<Consultation> {
  return this.http.get<Consultation>(URL + "/" + id);
}

getAll(): Observable<Consultation> {
  return this.http.get<Consultation>(URL + "/all");
}

update(consultation: Consultation): Observable<Consultation> {
  return this.http.put<Consultation>(URL + "/", consultation);
}

delete(id: number) {
  return this.http.delete(URL + "/", {observe: "response"});
}

}
