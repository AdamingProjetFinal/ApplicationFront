import { Questionnaire } from './../../model/Questionnaire';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.scss']
})
export class AccueilAdminComponent implements OnInit {
  questionnaire : Questionnaire = new Questionnaire
  constructor(
    private questionnaireService : QuestionnaireService
    ) { }

  ngOnInit() {
    this.recupererQuestionnaire()
  }

  recupererQuestionnaire() {
    this.questionnaireService.getLastQuestionnaire().subscribe((response: any) => {
      this.questionnaire = response.data
    })
  }

}
