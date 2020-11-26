import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from './../../model/Patient';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/patient'; // TODO mettre la bonne url
  patients :Patient[] = []
  patient :Patient = new Patient
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

  // Récupère un patient avec son id de type string
  getPatient(id: any){
    return this.http
    .get<Patient>(this.URL + '/' + id);
  }

  // Récupère un patient avec son email 
  getPatientByEmail(email:string){
    return this.http
    .get<Patient>(this.URL + '/email/' + email);
  }
  
  // Récupère la liste des patients  
  getPatients(){
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.patients = value));
  }
  
  // Sauvegarde un patient en base 
  save(patient : Patient) {
    return this.http.post(this.URL , patient, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un patient en base 
  update(patient: Patient) {
    return this.http.put(this.URL, patient, { observe: 'response' });
  }

  // Suppression d'un patient en base
  delete(id: any) {
    return this.http.delete(this.URL + '/' + id);
  }
   // rajouter les autres appel au back
}
