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

  constructor(
    private medecinService: MedecinService,
    private authService: AuthentificationService,
    private consultationService: ConsultationService
  ) { }

  ngOnInit() {
    this.medecin = this.authService.getUser();

    this.consultationService.getConsultationsByIdMedecin(this.authService.getUserId()).subscribe(
      (data) => {
        this.consultations = data;

        // Trier du plus récent
        const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
        const toDate = e => new Date(e.date).getTime();
        const byValue = (a, b) => a - b;
        const byDate = sortByMapped(toDate, byValue);
        console.log(this.consultations.sort(byDate).reverse());

        /*
        this.consultFiltre = this.consultations.filter(
          (value, index, array) => {
            !array.filter((v, i) => isEqual(value, v) && i < index).length);
      }
    )


*/
      }
    )
  }
  /*
  // Compare les objects
  function isEqual(a, b) {
    for (var i in a)
      if (a[i] != b[i])
        return false;
    for (var i in b)
      if (b[i] != a[i])
        return false;
    return true;
  } 
  */

}
