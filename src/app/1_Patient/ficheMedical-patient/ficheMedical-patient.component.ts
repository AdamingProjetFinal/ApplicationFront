import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheMedicale } from '../../model/FicheMedicale';
import { Patient } from '../../model/Patient';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { FicheMedicaleService } from '../../service/ficheMedicale/ficheMedicale.service';
import { PatientService } from '../../service/patient/patient.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-ficheMedical-patient',
  templateUrl: './ficheMedical-patient.component.html',
  styleUrls: ['./ficheMedical-patient.component.scss']
})
export class FicheMedicalPatientComponent implements OnInit {
  // Declaration des attributs
  id: string;
  patient: Patient = new Patient();
  select :boolean =false

  // Les fiches
  fichesMedicales: FicheMedicale[] = new Array();
  fichesSort: FicheMedicale[] = new Array();
  indiceFiche1: boolean = true;
  indiceFiche2: boolean = false;
  ficheMedicale: FicheMedicale = new FicheMedicale();

  constructor(
    private patientService: PatientService,
    private ficheService: FicheMedicaleService,
    private authService: AuthentificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    // Recuperer les fiches medicales du patient
    // TODO
    this.ficheService.getFichesByIdPatient(this.authService.getUserId()).subscribe(
      (data) => {
        this.fichesMedicales = data;
        if (this.fichesMedicales.length == 0) {
          // Message pour abscence de fiche
          this.indiceFiche1 = true;
          this.indiceFiche2 = false;
        } else {
          this.indiceFiche1 = false;
          this.indiceFiche2 = true;
          this.fichesSort = this.fichesMedicales;
        }
      }
    )
  }
  selectFiche(item: FicheMedicale) {
    this.select = !this.select
    this.ficheMedicale = item;
  }

  download() {
    var element = document.getElementById("ficheMedicale")
    html2canvas(element).then((canvas) => {
      var imgData =canvas.toDataURL("image/png")
      var doc =new jspdf()
      var imgHeight =(canvas.height)*208/ canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight)
      doc.save("image.pdf")

    })
  }

}
