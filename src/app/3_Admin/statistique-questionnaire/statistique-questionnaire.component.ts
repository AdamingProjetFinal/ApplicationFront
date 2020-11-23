import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Questionnaire } from './../../model/Questionnaire';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique-questionnaire',
  templateUrl: './statistique-questionnaire.component.html',
  styleUrls: ['./statistique-questionnaire.component.scss']
})
export class StatistiqueQuestionnaireComponent implements OnInit {
  public radarChartLabels: string[] = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
  data: Questionnaire[]
  public radarChartData: any = [
    { data: [], label: '' }
  ];
  public radarChartType = 'radar';
  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
  }

  initialiserData() {
    this.questionnaireService.getQuestionnaires().subscribe((value: any[]) => {
      console.log(this.data = value)
      this.radarChartData[0].data = [this.data.reduce((acc, cur) => acc + Number(cur.reponse1), 0) / this.data.length,
      this.data.reduce((acc, cur) => acc + Number(cur.reponse2), 0) / this.data.length,
      this.data.reduce((acc, cur) => acc + Number(cur.reponse3), 0) / this.data.length,
      this.data.reduce((acc, cur) => acc + Number(cur.reponse4), 0) / this.data.length
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
