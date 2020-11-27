import { ActivatedRoute } from '@angular/router';
import { FicheMedicaleService } from './../../service/ficheMedicale/ficheMedicale.service';
import { PatientService } from './../../service/patient/patient.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { FicheMedicale } from './../../model/FicheMedicale';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-addFiches-medecin',
  templateUrl: './addFiches-medecin.component.html',
  styleUrls: ['./addFiches-medecin.component.scss']
})
export class AddFichesMedecinComponent implements OnInit {

  @ViewChild('modalAddFicheMedicale') public modalAddFicheMedicale: ModalDirective
  @Input()
  idPatient: number;
  patient: Patient = new Patient();
  ficheMedicale: FicheMedicale = new FicheMedicale();
  today: number = Date.now();

  constructor(
    private authService: AuthentificationService,
    private patientService: PatientService,
    private ficheService: FicheMedicaleService,
    private ar: ActivatedRoute
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
        }
      }
    )
  }

  addFicheMedicale() {
    this.modalAddFicheMedicale.hide();
    this.ficheMedicale.patient = this.patient;
    this.ficheService.save(this.ficheMedicale).subscribe(
      (response) => {
        response.body;
      }
    )
  }

}
