import { PatientService } from './../../service/patient/patient.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { Specialite } from './../../model/Specialite';
import { SpecialiteService } from './../../service/specialite/specialite.service';
import { Medecin } from './../../model/Medecin';
import { Patient } from './../../model/Patient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
  medecin : Medecin = new Medecin
  patient : Patient = new Patient
  listSpecialites: Specialite[];
  constructor(private specialiteService : SpecialiteService,
    private medecinService: MedecinService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.getSepcialites()
  }

  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.listSpecialites = this.specialiteService.getSpecialites()
  }


  // sauvegarde d'un medecin
  saveMedecin() : void{
    this.medecinService.save(this.medecin)
  }

  // sauvegarde d'un patient
  savePatient() : void{
    console.log(this.patient);
    
    this.patientService.save(this.patient)
  }
}
