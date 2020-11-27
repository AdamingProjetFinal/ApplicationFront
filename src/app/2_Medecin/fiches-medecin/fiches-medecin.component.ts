import { FicheMedicaleService } from './../../service/ficheMedicale/ficheMedicale.service';
import { ConsultationService } from './../../service/consultation/consultation.service';
import { FicheMedicale } from './../../model/FicheMedicale';
import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-fiches-medecin',
  templateUrl: './fiches-medecin.component.html',
  styleUrls: ['./fiches-medecin.component.scss']
})
export class FichesMedecinComponent implements OnInit {
  // Declaration des attributs
  patient: Patient = new Patient();
  fichesMedicales: FicheMedicale[] = new Array();
  patientId: number;
  ficheMedicale: FicheMedicale = new FicheMedicale();
  select =false;


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
              this.patientId = this.patient.id;
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

  selectFiche(item: FicheMedicale) {
    this.select = !this.select
    this.ficheMedicale = item;
  }

  download() {
    var element = document.getElementById("details")
    html2canvas(element).then((canvas) => {
      var imgData =canvas.toDataURL("image/png")
      var doc =new jspdf()
      var imgHeight =(canvas.height)*208/ canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight)
      doc.save("image.pdf")

    })
  }

}
