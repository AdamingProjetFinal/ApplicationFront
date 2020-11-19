import { Medecin } from './../../../model/Medecin';
import { MedecinService } from './../../../service/medecin/medecin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.scss']
})
export class ListMedecinComponent implements OnInit {
  listMedecin : Medecin[]
  constructor(private medecinService : MedecinService) { }

  ngOnInit() {
    this.getList()
  }

  // Récupère la liste des medecins via le service Medecin
  getList(){
    this.listMedecin = this.medecinService.getMedecins()
  }
}
