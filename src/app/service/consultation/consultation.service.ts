import { Observable } from 'rxjs';
import { Consultation } from './../../model/Consultation';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConsultationService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/consultation';
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

save(consultation: Consultation): Observable<HttpResponse<Object>>{
  return this.http.post(this.URL, consultation, { headers: this.headers, observe: 'response' });
}

saveConsultationMedPat(consultation: Consultation ,idMedecin:number,idPatient:number): Observable<HttpResponse<Object>>{
  return this.http.post(this.URL+"/saveConsultationMedPat/"+idMedecin+"/"+idPatient, consultation, { headers: this.headers, observe: 'response' });
}

// saveConsultationMedPat/{idMedecin}/{idPatient}
getConsultation(id: number): Observable<any> {
  return this.http.get<any>(this.URL + "/" + id);
}

getConsultations(): Observable<Consultation[]> {
  return this.http.get<Consultation[]>(this.URL + "/all");
}

update(consultation: Consultation): Observable<HttpResponse<Object>>{
  return this.http.put<Consultation>(this.URL, consultation, {observe: "response"});
}

delete(id: number) {
  return this.http.delete(this.URL + '/' + id, {observe: "response"});
}

// http://localhost:5050/gestion-rdv-microservice/consultation/getByIdMedecin/1
getConsultationsByIdMedecin(id :number): Observable<Consultation[]> {
  return this.http.get<Consultation[]>(this.URL + "/getByIdMedecin/"+id);
}

// http://localhost:5050/gestion-rdv-microservice/consultation/getByIdPatient/1
getConsultationsByIdPatient(id :number): Observable<Consultation[]> {
  return this.http.get<Consultation[]>(this.URL + "/getByIdPatient/"+id);
}

}
