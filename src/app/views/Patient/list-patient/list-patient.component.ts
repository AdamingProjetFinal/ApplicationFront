import { Patient } from './../../../model/Patient';
import { PatientService } from './../../../service/patient/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
  listPatient : Patient[]
  constructor(private patientService : PatientService) { }

  ngOnInit() {
    this.getList()
  }

  // Récupère la liste des patients via le service Patient
  getList(){
    this.listPatient = this.patientService.getPatients()
  }
}
