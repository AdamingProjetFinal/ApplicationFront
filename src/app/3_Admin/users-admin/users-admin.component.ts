import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Patient } from './../../model/Patient';
import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../model/Medecin';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
  listPatients: Patient[] = new Array();
  listMedecins: Medecin[] = new Array();
  medecin: Medecin = new Medecin();
  patient: Patient = new Patient();

  constructor(
    private authService: AuthentificationService,
    private patientService: PatientService,
    private medecinService: MedecinService
  ) { }

  ngOnInit() {

    this.patientService.getPatients().subscribe(
      (data) => {
        this.listPatients = data;
      }
    )

    this.medecinService.getMedecins().subscribe(
      (data) => {
        this.listMedecins = data;
      }
    )

  }

}
