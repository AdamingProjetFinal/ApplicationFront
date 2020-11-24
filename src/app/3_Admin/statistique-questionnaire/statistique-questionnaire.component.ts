import { startWith, map } from 'rxjs/operators';
import { MedecinService } from './../../service/medecin/medecin.service';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { Specialite } from './../../model/Specialite';
import { Observable, combineLatest } from 'rxjs';
import { Medecin } from './../../model/Medecin';
import { FormControl } from '@angular/forms';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Questionnaire } from './../../model/Questionnaire';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique-questionnaire',
  templateUrl: './statistique-questionnaire.component.html',
  styleUrls: ['./statistique-questionnaire.component.scss']
})
export class StatistiqueQuestionnaireComponent implements OnInit {

  // Paramettre pour le graphique
  public radarChartLabels: string[] = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
  radarOptions = { scale: { ticks: { min: 0, max: 5, stepSize: 1 , backdropColor : 'rgba(255, 255, 255, 0)'}, pointLabels : {fontSize:11 }} }
  public radarChartType = 'radar';
  public radarChartData: any = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  // Paramètres pour la récupération des consultation et le filtre
  listQuestionnaire: Questionnaire[]
  questionnaires: Questionnaire[]
  listId: number[] = []

  // Paramètre pour la liste des medecins et le filtre 
  filter: FormControl;
  listMedecin: Medecin[]
  filterSpe: FormControl;
  filter$: Observable<string>;
  listSpecialites: Specialite[];
  filterSpe$: Observable<string>;
  medecin$: Observable<Medecin[]>
  filteredMedecin$: Observable<Medecin[]>;
  listSpecialites$: Observable<Specialite[]>;


  constructor(private questionnaireService: QuestionnaireService,
    private consultationService: ConsultationService,
    private specialiteService: SpecialiteService,
    private medecinService: MedecinService) {

    this.medecin$ = this.getList();
    // nom des champs dans le HTML
    this.filter = new FormControl('');
    this.filterSpe = new FormControl('');
    // Différents filtres utilisés
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filterSpe$ = this.filterSpe.valueChanges.pipe(startWith(''))
    // filtrage des données de la liste de médecins (Observable<Medecin[]>)
    this.filteredMedecin$ = combineLatest([this.medecin$, this.filter$, this.filterSpe$])
      .pipe(
        map(([listMedecin, filterString, filterSpe]) =>
          listMedecin
            .filter(medecin =>
              (medecin.nom ? medecin.nom.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 : true)
              && (filterSpe ? medecin.specialite.nom === filterSpe : true)
            )
        )
      );
  }

  ngOnInit() {
    this.initialiserData(6)
    this.initialiserMoyene() 
    this.getSepcialites()
  }

  initialiserMoyene() {
    this.questionnaireService.getQuestionnaires().subscribe((value: any[]) => {
      this.questionnaires = value
      this.radarChartData[1].data = [
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse1), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse2), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse3), 0) / this.questionnaires.length,
      this.questionnaires.reduce((acc, cur) => acc + Number(cur.reponse4), 0) / this.questionnaires.length
      ]
      this.radarChartData[1].label = "Réponses moyennes"
    });
  }

  initialiserData(idMedecin: number) {
    // récuperer la liste de id des consultation pour un medecin specifique
    this.consultationService.getConsultationsByIdMedecin(idMedecin).subscribe(listConsult => {
      this.listId = listConsult.map(consult => consult.id)
      // récupérer les questionnaire en base
      this.questionnaireService.getQuestionnaires().subscribe((value: any[]) => {
        // filtrer pour ne garder que les questionnaires concernant le médecin choisi
        let listFiltreQuastionnaire: any[] = []
        this.medecinService.getMedecin(idMedecin.toString()).subscribe((reponse: any) => {
          this.radarChartData[0].label = "Réponse pour le medecin : " + reponse.data.nom

          listFiltreQuastionnaire = value.filter(a => this.listId.includes(a.idConsultation))
          // faire la compilation des données pour chaque question
          this.radarChartData[0].data = [
            listFiltreQuastionnaire.reduce((acc, cur) => acc + Number(cur.reponse1), 0) / listFiltreQuastionnaire.length,
            listFiltreQuastionnaire.reduce((acc, cur) => acc + Number(cur.reponse2), 0) / listFiltreQuastionnaire.length,
            listFiltreQuastionnaire.reduce((acc, cur) => acc + Number(cur.reponse3), 0) / listFiltreQuastionnaire.length,
            listFiltreQuastionnaire.reduce((acc, cur) => acc + Number(cur.reponse4), 0) / listFiltreQuastionnaire.length,
          ]

        }
        )
      });
    })
  }


  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.listSpecialites$ = this.specialiteService.getSpecialites()
  }

  // Récupère la liste des medecins via le service Medecin renvoie un Observable<Medecin[]>
  getList() {
    return this.medecinService.getMedecins()
  }
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {
    // console.log(e); // si on passe sur le graphique
  }

}
