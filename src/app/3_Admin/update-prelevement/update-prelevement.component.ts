import { Router } from '@angular/router';
import { FormuleService } from './../../service/formule/formule.service';
import { Component, OnInit } from '@angular/core';
import { Formule } from '../../model/Formule';
import { now } from 'moment';

@Component({
  selector: 'app-update-prelevement',
  templateUrl: './update-prelevement.component.html',
  styleUrls: ['./update-prelevement.component.scss']
})
export class UpdatePrelevementComponent implements OnInit {
  formule: Formule = new Formule()
  constructor(
    private formuleService: FormuleService,
    private router: Router) { }

  ngOnInit() {
    this.recuperationFormule()
  }

  recuperationFormule() {
    this.formuleService.getLast().subscribe(reponse =>
      this.formule = reponse.data)
  }

  save() {
    this.formule.id = null
    this.formuleService.save(this.formule).subscribe();
    this.router.navigate(['/admin']);

  }
  annuler() {
    this.router.navigate(['/admin']);
  }
}
