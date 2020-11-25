import { FicheMedicaleService } from './../../service/ficheMedicale/ficheMedicale.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { FicheMedicale } from './../../model/FicheMedicale';
import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-fiches-medecin',
  templateUrl: './fiches-medecin.component.html',
  styleUrls: ['./fiches-medecin.component.scss']
})
export class FichesMedecinComponent implements OnInit {
  // Declaration des attributs
  patient: Patient = new Patient();
  fichesMedicales: FicheMedicale[] = new Array();


  constructor(
    private ar: ActivatedRoute,
    private rt: Router,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private ficheService: FicheMedicaleService
  ) { }

  ngOnInit() {
    this.ar.params.subscribe(
      pars => {
        let id = pars.pId;
        if(id != undefined) {
          this.patientService.getPatient(id).subscribe(
            (response: any) => {
              this.patient = response.data;
            }
          )
          this.ficheService.getFichesByIdPatient(id).subscribe(
            (data) => {
              this.fichesMedicales = data;
            }
          )
        }
      }
    )
  }

}
