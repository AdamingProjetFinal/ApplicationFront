import { Questionnaire } from './../../model/Questionnaire';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { ReponseService } from './../../service/reponse/reponse.service';
import { Observable, combineLatest } from 'rxjs';
import { Reponse } from './../../model/Reponse';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-Araignee',
  templateUrl: './Araignee.component.html',
  styleUrls: ['./Araignee.component.scss']
})
export class AraigneeComponent implements OnInit {
  @Input()
  idMedecin: number

  // Paramettre pour le graphique
  public radarChartLabels: string[] = [];
  radarOptions = { scale: { ticks: { min: 0, max: 5, stepSize: 1, backdropColor: 'rgba(255, 255, 255, 0)' }, pointLabels: { fontSize: 11 } } }
  public radarChartType = 'radar';
  public radarChartData: any = [
    { data: [], label: '' },
    { data: [], label: 'Selectionnez un médecin' }
  ];

  // Paramètres pour la récupération des consultation et le filtre
  listReponse: Reponse[]
  reponses: Reponse[]
  listId: number[] = []
  questionnaire$: Observable<any> = new Observable

  constructor(private reponseService: ReponseService,
    private questionnaireService: QuestionnaireService,
    private consultationService: ConsultationService,
    private medecinService: MedecinService) { }

  ngOnInit() {
    if (this.idMedecin >= 0) {
      this.initialiserData(this.idMedecin)
    }
    this.initialiserQuestionnaire()
    this.initialiserMoyene()
  }

  // Actualiser le graphique lorsque l'id du medecin envoyé a changé
  ngOnChanges() {
    if (this.idMedecin >= 0) {
      this.initialiserData(this.idMedecin)
    }
  }

  initialiserQuestionnaire() {
    this.questionnaire$ = this.questionnaireService.getLastQuestionnaire()
    this.questionnaire$.subscribe((response: any) => {
      let questionnaire: Questionnaire = response.data
      console.log(questionnaire);

      this.radarChartLabels[0] = (questionnaire.tagQuestion1)
      this.radarChartLabels[1] = (questionnaire.tagQuestion2)
      this.radarChartLabels[2] = (questionnaire.tagQuestion3)
      this.radarChartLabels[3] = (questionnaire.tagQuestion4)

    })
  }
  initialiserMoyene() {

    this.questionnaire$.subscribe((response: any) => {
      this.reponseService.getReponsesQuestionnaire(response.data.id)
        .subscribe((value: any[]) => {
          this.reponses = value
          this.radarChartData[0].data = [
            this.reponses.reduce((acc, cur) => acc + cur.reponse1, 0) / this.reponses.length,
            this.reponses.reduce((acc, cur) => acc + cur.reponse2, 0) / this.reponses.length,
            this.reponses.reduce((acc, cur) => acc + cur.reponse3, 0) / this.reponses.length,
            this.reponses.reduce((acc, cur) => acc + cur.reponse4, 0) / this.reponses.length
          ]
          this.radarChartData[0].label = "Réponses moyennes"
        });
    })


  }


  initialiserData(idMed: number) {
    // récuperer la liste de id des consultation pour un medecin specifique
    this.consultationService.getConsultationsByIdMedecin(idMed).subscribe(listConsult => {
      this.listId = listConsult.map(consult => consult.id)
      // récupérer les reponse en base
      this.questionnaire$.subscribe((response: any) => {
        this.reponseService.getReponsesQuestionnaire(response.data.id).subscribe((value: any[]) => {
          // filtrer pour ne garder que les reponses concernant le médecin choisi
          let listFiltreQuastionnaire: any[] = []
          this.medecinService.getMedecin(idMed.toString()).subscribe((reponse: any) => {
            this.radarChartData[1].label = "Réponse pour le medecin : " + reponse.data.nom

            listFiltreQuastionnaire = value.filter(a => this.listId.includes(a.idConsultation))
            // faire la compilation des données pour chaque question
            this.radarChartData[1].data = [
              listFiltreQuastionnaire.reduce((acc, cur) => acc + cur.reponse1, 0) / listFiltreQuastionnaire.length,
              listFiltreQuastionnaire.reduce((acc, cur) => acc + cur.reponse2, 0) / listFiltreQuastionnaire.length,
              listFiltreQuastionnaire.reduce((acc, cur) => acc + cur.reponse3, 0) / listFiltreQuastionnaire.length,
              listFiltreQuastionnaire.reduce((acc, cur) => acc + cur.reponse4, 0) / listFiltreQuastionnaire.length,
            ]

          }
          )
        });
      })
    })
  }



  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {
    // console.log(e); // si on passe sur le graphique
  }

}