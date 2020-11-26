import { Questionnaire } from './../../model/Questionnaire';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  URL = 'http://localhost:5050/gestion-admin-microservice/QuestionnaireStatic';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  questionnaires: Questionnaire[];
  constructor(private http: HttpClient) { }

  // Récupère une Questionnaire avec son id 
  getQuestionnaire(id: number): Observable<Questionnaire> {
    return this.http
      .get<Questionnaire>(this.URL + '/' + id);
  }

  // Récupère une Questionnaire avec son id 
  getLastQuestionnaire(): Observable<any> {
    return this.http
      .get<any>(this.URL+ '/last');
  }
  // Récupère la liste des Questionnaires  
  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http
      .get<any[]>(this.URL + '/all')
      .pipe(map(value => this.questionnaires = value));
  }

  // Sauvegarde un questionnaire en base 
  save(questionnaire: Questionnaire): Observable<HttpResponse<Object>> {
    return this.http.post(this.URL, questionnaire, { headers: this.headers, observe: 'response' }).pipe()
  }

  // Mise à jour d'un questionnaire en base 
  update(questionnaire: Questionnaire): Observable<HttpResponse<Object>> {
    return this.http.put(this.URL, questionnaire, { observe: 'response' });
  }

  // Suppression d'un questionnaire en base
  delete(id: any): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
