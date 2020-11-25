import { Patient } from './../../model/Patient';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { Consultation } from './../../model/Consultation';
import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../model/Medecin';

@Component({
  selector: 'app-patients-medecin',
  templateUrl: './patients-medecin.component.html',
  styleUrls: ['./patients-medecin.component.scss']
})
export class PatientsMedecinComponent implements OnInit {
  // Declaration des attributs
  medecin: Medecin;
  consultations: Consultation[] = new Array();
  consultFiltre: Consultation[] = new Array();
  patients: Patient[] = new Array();
  patientsFiltre: Patient[] = new Array();
  id: String;

  constructor(
    private medecinService: MedecinService,
    private authService: AuthentificationService,
    private consultationService: ConsultationService
  ) { }

  ngOnInit() {
    this.medecin = this.authService.getUser();

    this.medecinService.getAllPatients(this.authService.getUserId()).subscribe(
      (data) => {
        this.patients = data;
        this.patientsFiltre = this.patients;
      }
    )
  }
}
