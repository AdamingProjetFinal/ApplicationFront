import { Router } from '@angular/router';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Questionnaire } from './../../model/Questionnaire';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-questionnaires',
  templateUrl: './gestion-questionnaires.component.html',
  styleUrls: ['./gestion-questionnaires.component.scss']
})
export class GestionQuestionnairesComponent implements OnInit {
  // Initialisation des paramètres
  questionnaire : Questionnaire = new Questionnaire()
  modeEditQuestionnaire : boolean = true

  constructor(
    private questionnaireService : QuestionnaireService,
    private router : Router
  ) { }

  ngOnInit() {
    this.recuperationQuestionnaire()
  }

  // TODO recuperer le dernier questionnaire
  recuperationQuestionnaire(){
    this.questionnaireService.getLastQuestionnaire().subscribe((reponse : any) => {
      this.questionnaire = reponse.data
    })
  }

  nouveauQuestionnaire(){
    this.questionnaire = new Questionnaire()
    this.modeEditQuestionnaire = false
  }

  annuler(){
    if (this.modeEditQuestionnaire) {
      this.router.navigate(['/admin'])
    } else {
      this.recuperationQuestionnaire()
      this.modeEditQuestionnaire = true
    }
  }

  sauvegarderQuestionnaire(){
    if (this.modeEditQuestionnaire) {
      this.questionnaireService.update(this.questionnaire).subscribe()
    } else {
      this.questionnaireService.save(this.questionnaire).subscribe()
    }
    this.router.navigate(['/admin'])
  }
}
