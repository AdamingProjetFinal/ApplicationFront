import { Questionnaire } from './../../model/Questionnaire';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.scss']
})
export class AccueilAdminComponent implements OnInit {
  public radarChartLabels: string[] = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
  questionnaires: Questionnaire[]
  public radarChartData: any = [
    { data: [], label: '' }
  ];
  public radarChartType = 'radar';
  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.initialiserData()
  }

  initialiserData() {
    this.questionnaireService.getQuestionnaires().subscribe((value: any[]) => {
      console.log(this.questionnaires = value)
      this.radarChartData[0].data = [this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse1), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse2), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse3), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse4), 0) / this.questionnaires.length
      ]
      this.radarChartData[0].label = "Réponse"
    });
  }

  public chartClicked(e: any): void {
    // console.log(e);  // si on clique sur le graphique
  }

  public chartHovered(e: any): void {
    // console.log(e); // si on passe sur le graphique
  }

}
