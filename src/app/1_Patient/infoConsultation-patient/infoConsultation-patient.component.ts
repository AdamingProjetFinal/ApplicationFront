import { Specialite } from './../../model/Specialite';
import { Adresse } from './../../model/Adresse';
import { MedecinService } from './../../service/medecin/medecin.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { Consultation } from './../../model/Consultation';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Medecin } from '../../model/Medecin';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infoConsultation-patient',
  templateUrl: './infoConsultation-patient.component.html',
  styleUrls: ['./infoConsultation-patient.component.scss']
})
export class InfoConsultationPatientComponent implements OnInit {
  @ViewChild('infoConsultation') public infoConsultation: ModalDirective;
  @Input()
  infoId: number;
  id: number;
  consultation: Consultation = new Consultation();
  medecin: Medecin = new Medecin();
  adresse: Adresse = new Adresse();
  specialite: Specialite = new Specialite();

  constructor(
    private consultationService: ConsultationService,
    private medecinService: MedecinService
  ) { }

  ngOnInit() {
    this.medecin.adresse = this.adresse;
    this.medecin.specialite = this.specialite;
  }

  showModalInfoConsultation(id: number) {
    this.id = id;
    this.consultationService.getConsultation(this.id).subscribe(
      (response: any) => {
        this.consultation = response.data;
        this.medecinService.getMedecin(this.consultation.medecin.id).subscribe(
          (response: any) => {
            this.medecin = response.data;
          }
        )
      }
    )
    this.infoConsultation.show();
  }

}
