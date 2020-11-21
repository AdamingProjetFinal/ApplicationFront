import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from './../../model/Patient';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  URL = 'http://localhost:5050/gestion-rdv-microservice/patient'; // TODO mettre la bonne url
  patients :Patient[] = []
  patient :Patient = new Patient
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

  // Récupère un medecin avec son id 
  getPatient(id:string){
    return this.http
    .get<Patient>(this.URL + '/' + id);
  }
  
  // Récupère la liste des patients  
  getPatients(){
    return this.http
          .get<any[]>(this.URL + '/all')
          .pipe(map(value => this.patients = value));
  }
  
  // Sauvegarde un medecin en base 
  save(patient : Patient) {
    return this.http.post(this.URL , patient, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un medecin en base 
  update(patient: Patient) {
    return this.http.put(this.URL, patient, { observe: 'response' });
  }

  // Suppression d'un medecin en base
  delete(id: any) {
    return this.http.delete(this.URL + '/' + id);
  }
   // rajouter les autres appel au back
}
