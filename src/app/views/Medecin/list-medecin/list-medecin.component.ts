import { AlerteService } from './../../../service/alerte/alerte.service';
import { PatientService } from './../../../service/patient/patient.service';
import { Patient } from './../../../model/Patient';
import { SpecialiteService } from './../../../service/specialite/specialite.service';
import { Specialite } from './../../../model/Specialite';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { Medecin } from './../../../model/Medecin';
import { MedecinService } from './../../../service/medecin/medecin.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { AuthentificationService } from '../../../service/authentification/authentification.service';

@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.scss']
})
export class ListMedecinComponent implements OnInit {
  listMedecin: Medecin[]
  medecin$: Observable<Medecin[]>
  filteredMedecin$: Observable<Medecin[]>;
  filter: FormControl;
  filter$: Observable<string>;
  filterSpe: FormControl;
  filterSpe$: Observable<string>;
  listSpecialites: Specialite[];
  listSpecialites$: Observable<Specialite[]>;

  constructor(private medecinService: MedecinService,
    private specialiteService: SpecialiteService,
    private authentificationService: AuthentificationService,
    private patientService: PatientService,
    private alerteService: AlerteService) {
    // template recherche dynamique :
    // https://stackblitz.com/edit/angular-filtering-rxjs-bsxbf5?file=src%2Fapp%2Fapp.component.ts

    this.medecin$ = this.getList();
    // nom des champs dans le HTML
    this.filter = new FormControl('');
    this.filterSpe = new FormControl('');
    // Différents filtres utilisés
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filterSpe$ = this.filterSpe.valueChanges.pipe(startWith(''))
    // filtrage des données de la liste de médecins (Observable<Medecin[]>)
    this.filteredMedecin$ = combineLatest([this.medecin$, this.filter$, this.filterSpe$])
      .pipe(
        map(([listMedecin, filterString, filterSpe]) =>
          listMedecin
            .filter(medecin =>
              (medecin.nom ? medecin.nom.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 : true)
              && (filterSpe ? medecin.specialite.nom === filterSpe : true)
            )
        )
      );
  }

  ngOnInit() {
    this.getList()
    this.getSepcialites()
  }


  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.listSpecialites$ = this.specialiteService.getSpecialites()
  }

  // Récupère la liste des medecins via le service Medecin renvoie un Observable<Medecin[]>
  getList() {
    return this.medecinService.getMedecins()
  }

  // Ajouter un medecin en tant que medecin traitant 
  ajoutMedecinTraitant(medecin: Medecin) {
    if (this.authentificationService.isPatient()) {
      let patient: Patient
      patient = this.authentificationService.getUser()
      patient.medecin = medecin

      this.patientService.update(patient).subscribe(response => {
        if (response.status == 200) {
          this.alerteService.success("Le medecin a bien été ajouté")
        } else {
          this.alerteService.error("Le medecin n'a pas pu être ajouté")
        }
      })
    } else {
      this.alerteService.error("Vous ne pouvez pas ajouter de medecin traitant")
    }
  }
}