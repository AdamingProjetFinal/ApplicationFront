import { ActeService } from './../../../service/acte/acte.service';
import { Acte } from './../../../model/Acte';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-acte',
  templateUrl: './form-acte.component.html',
  styleUrls: ['./form-acte.component.scss']
})
export class FormActeComponent implements OnInit {
  acte : Acte = new Acte
  constructor(private acteService : ActeService) { }

  ngOnInit() {
  }

  save(){
    this.acteService.save(this.acte)
    this.acte = new Acte()
  }
}
