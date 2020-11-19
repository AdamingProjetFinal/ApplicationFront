import { MedecinService } from '../../../service/medecin/medecin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-forms-medecin',
  templateUrl: './forms-medecin.component.html',
  styleUrls: ['./forms-medecin.component.scss']
})
export class FormsMedecinComponent implements OnInit {
  id:number
  constructor(private medecineService : MedecinService,
              private activatedRoute : ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param['id'];
    })
  }

}
