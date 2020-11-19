import { MedecinService } from './../../service/medecin/medecin.service';
import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../model/Medecin';

@Component({
  selector: 'app-Medecin',
  templateUrl: './Medecin.component.html',
  styleUrls: ['./Medecin.component.scss']
})
export class MedecinComponent implements OnInit {

  medecin :Medecin = new Medecin()
  constructor(private medecinService :MedecinService) { }

  ngOnInit() {
    this.getMedecin()
  }

  getMedecin():void{
    this.medecin = this.medecinService.getMedecin()
  }
}
