import { Admin } from './../../model/Admin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL = 'http://localhost:5050/gestion-admin-microservice/Admin';
  headers = new HttpHeaders({'Content-Type': 'application/json'})
constructor(private http: HttpClient) { }

  // Récupère un admin avec son id 
  getAdmin(id:string){
    return this.http
    .get<Admin>(this.URL + '/' + id);
  }
    
  // Sauvegarde un admin en base 
  save(admin : Admin) {
    return this.http.post(this.URL , admin, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un admin en base 
  update(admin: Admin) {
    return this.http.put(this.URL, admin, { observe: 'response' });
  }

  // Suppression d'un admin en base
  delete(id: any) {
    return this.http.delete(this.URL + '/' + id);
  }

  // TODO rajouter les autres appel au back 
}
