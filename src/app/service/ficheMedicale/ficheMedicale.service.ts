import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheMedicale } from '../../model/FicheMedicale';

@Injectable({
  providedIn: 'root'
})
export class FicheMedicaleService {

  URL = 'http://localhost:'; // TODO mettre la bonne url

constructor(private http: HttpClient) { }

save(ficheMedicale: FicheMedicale): Observable<FicheMedicale> {
  return this.http.post<FicheMedicale>(URL + "/", ficheMedicale);
}

getByID(id: number): Observable<FicheMedicale> {
  return this.http.get<FicheMedicale>(URL + "/" + id);
}

getAll(): Observable<FicheMedicale> {
  return this.http.get<FicheMedicale>(URL + "/all");
}

update(ficheMedicale: FicheMedicale): Observable<FicheMedicale> {
  return this.http.put<FicheMedicale>(URL + "/", ficheMedicale);
}

delete(id: number) {
  return this.http.delete(URL + "/", {observe: "response"});
}



}
