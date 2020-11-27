import { FormuleService } from './../../service/formule/formule.service';
import { Formule } from './../../model/Formule';
import { ComptabiliteService } from './../../service/comptabilite/comptabilite.service';
import { Questionnaire } from './../../model/Questionnaire';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.scss']
})
export class AccueilAdminComponent implements OnInit {
  questionnaire: Questionnaire = new Questionnaire
  formule: Formule = new Formule
  gainTotal : number
  constructor(
    private formuleService: FormuleService,
    private questionnaireService: QuestionnaireService,
    private comptabiliteService: ComptabiliteService
  ) { }

  ngOnInit() {
    this.recupererQuestionnaire()
    this.recupererComptabilite()
    this.recupererFormule()
  }

  recupererQuestionnaire() {
    this.questionnaireService.getLastQuestionnaire().subscribe((response: any) => {
      this.questionnaire = response.data
    })
  }

  recupererFormule() {
    this.formuleService.getLast().subscribe((response: any) => {
      console.log(this.formule = response.data)
    })
  }

  recupererComptabilite() {
    this.comptabiliteService.getComptabilites().subscribe(comptas => {
      this.gainTotal = comptas.reduce((somme, compta) => somme + compta.gain, 0)
    })
  }
}
