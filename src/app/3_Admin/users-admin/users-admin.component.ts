import { Router } from '@angular/router';
import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Patient } from './../../model/Patient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Medecin } from '../../model/Medecin';
import { AlerteService } from '../../service/alerte/alerte.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
  @ViewChild('deletePatientModal') public deletePatientModal: ModalDirective;
  @ViewChild('deleteMedecinModal') public deleteMedecinModal: ModalDirective;
  @ViewChild('updatePatientModal') public updatePatientModal: ModalDirective;
  @ViewChild('updateMedecinModal') public updateMedecinModal: ModalDirective;
  listPatients: Patient[] = new Array();
  listMedecins: Medecin[] = new Array();
  medecin: Medecin = new Medecin();
  patient: Patient = new Patient();
  id: number;

  constructor(
    private patientService: PatientService,
    private medecinService: MedecinService,
    private alerteService: AlerteService
  ) { }

  ngOnInit() {
    this.recupAllPatients();
    
    this.recupAllMedecins();
    
  }

  recupAllPatients() {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.listPatients = data;
      }
    )
  }

  recupAllMedecins() {
    this.medecinService.getMedecins().subscribe(
      (data) => {
        this.listMedecins = data;
      }
    )
  }

  /* === FONCTIONNALITE DELETE === */
  // Modal Medecin
  showModalDeleteMedecin(id:number) {
    this.id = id;
    this.deleteMedecinModal.show();
  }

  // Modal Patient
  showModalDeletePatient(id: number) {
    this.id = id;
    this.deletePatientModal.show();
    console.log(this.id);
  }

  // Delete Medecin
  deleteMedecin() {
    this.medecinService.delete(this.id).subscribe((response: any) => {
      if (response.status == "OK") {
        this.alerteService.error("Le profil a bien été supprimé")
        this.recupAllMedecins();
        this.deleteMedecinModal.hide();
      } else {
        this.alerteService.error("Erreur lors de la suppression du compte")
      }
    })
  }

  // Delete Patient
  deletePatient() {
    this.patientService.delete(this.id).subscribe((response: any) => {
      if (response.status == "OK") {
        this.alerteService.error("Le profil a bien été supprimé")
        this.recupAllPatients();
        this.deletePatientModal.hide();
      } else {
        this.alerteService.error("Erreur lors de la suppression du compte")
      }
    });
  }

  /* === UPDATE === */
  showModalUpdateMedecin(id:number) {
    this.id = id;
    this.medecinService.getMedecin(this.id).subscribe(
      (response: any) => {
        this.medecin = response.data;
      }
    )
    this.updateMedecinModal.show();
  }

  showModalUpdatePatient(id: number) {
    this.id = id;
    this.patientService.getPatient(this.id).subscribe( 
      (response: any) => {
        this.patient = response.data;
      }
    )
    this.updatePatientModal.show();
  }

  updatePatient() {
    this.patientService.update(this.patient).subscribe( 
      (response) => {
        this.recupAllPatients();
        this.updatePatientModal.hide();
      }
    )
  }

  updateMedecin() {
    this.medecinService.update(this.medecin).subscribe(
      (response) => {
        this.recupAllMedecins();
        this.updateMedecinModal.hide();
      }
    )
  }

}
