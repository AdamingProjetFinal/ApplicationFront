import { Reponse } from './../../model/Reponse';
import { Questionnaire } from './../../model/Questionnaire';
import { QuestionnaireService } from './../../service/questionnaire/questionnaire.service';
import { ReponseService } from './../../service/reponse/reponse.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reponseQuestionnaire',
  templateUrl: './reponseQuestionnaire.component.html',
  styleUrls: ['./reponseQuestionnaire.component.scss']
})
export class ReponseQuestionnaireComponent implements OnInit {
  // Modal
  @ViewChild('modalReponseQuestionnaire') public modalReponseQuestionnaire: ModalDirective
  @Input()
  idConsultationPourQuestionnaire: number
  avisDonne: boolean
  questionnaire: Questionnaire = new Questionnaire
  reponses: number[] = [0, 0, 0, 0]
  questions: string[] = []

  constructor(
    private reponseService: ReponseService,
    private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.recupereAvis()
    this.recupereQuestionnaire()
  }

  recupereAvis() {
    this.reponseService.getReponseByIdConsultation(this.idConsultationPourQuestionnaire).subscribe(
      (response: any) => {
        this.avisDonne = (response.status == "FOUND")
      }
    )
  }

  // TODO methode pour recupere le dernière questionnaire créé
  recupereQuestionnaire() {
    this.questionnaireService.getQuestionnaire(1).subscribe((response: any) => {
      this.questionnaire = response.data
      this.questions.push(this.questionnaire.question1)
      this.questions.push(this.questionnaire.question2)
      this.questions.push(this.questionnaire.question3)
      this.questions.push(this.questionnaire.question4)
    })
  }

  // bouton valider de la modal de reponse au questionnaire
  validationModalReponseQuestionnaire() {
    this.modalReponseQuestionnaire.hide()
    console.log(this.reponses);
    let reponse: Reponse = new Reponse
    reponse.idConsultation = this.idConsultationPourQuestionnaire
    reponse.questionnaire = this.questionnaire
    reponse.reponse1 = this.reponses[0]
    reponse.reponse2 = this.reponses[1]
    reponse.reponse3 = this.reponses[2]
    reponse.reponse4 = this.reponses[3]
    console.log(reponse);
    this.reponseService.save(reponse).subscribe((response: any) => {
      if (response.status == 200) {
        this.avisDonne = true
      }

    })
  }

  ouvrirModalReponseQuestionnaire(idConsultation: number) {
    this.idConsultationPourQuestionnaire = idConsultation
    this.modalReponseQuestionnaire.show()
  }
}
