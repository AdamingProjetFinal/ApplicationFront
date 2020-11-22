import { AlerteService } from './../../../service/alerte/alerte.service';
import { SpecialiteService } from './../../../service/specialite/specialite.service';
import { Specialite } from './../../../model/Specialite';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-nouvelle-specialite',
  templateUrl: './nouvelle-specialite.component.html',
  styleUrls: ['./nouvelle-specialite.component.scss']
})
export class NouvelleSpecialiteComponent implements OnInit {
  specialite : Specialite = new Specialite
  constructor(
    private specialiteService: SpecialiteService,
    private alerteService: AlerteService
    ) { }

  ngOnInit() {
  }
  save(){
    this.specialiteService.save(this.specialite).subscribe(response => {
      response.body
      if (response.status == 200) {
        this.alerteService.success("La spécialité a bien été ajoutée")
      } else {
        this.alerteService.error("La spécialité n'a pas pu être ajoutée")
      }
    })
  }
}
