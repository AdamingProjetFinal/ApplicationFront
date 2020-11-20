import { SpecialiteService } from './../../../service/specialite/specialite.service';
import { Specialite } from './../../../model/Specialite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouvelle-specialite',
  templateUrl: './nouvelle-specialite.component.html',
  styleUrls: ['./nouvelle-specialite.component.scss']
})
export class NouvelleSpecialiteComponent implements OnInit {
  specialite : Specialite = new Specialite
  constructor(private specialiteService: SpecialiteService) { }

  ngOnInit() {
  }
  save(){
    this.specialiteService.save(this.specialite)
    this.specialite = new Specialite()
  }
}
