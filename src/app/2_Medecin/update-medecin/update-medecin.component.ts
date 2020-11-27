import { Router } from '@angular/router';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { MedecinComponent } from './../../views/Medecin/Medecin.component';
import { Medecin } from './../../model/Medecin';
import { Component, OnInit } from '@angular/core';
import { Adresse } from '../../model/Adresse';

@Component({
  selector: 'app-update-medecin',
  templateUrl: './update-medecin.component.html',
  styleUrls: ['./update-medecin.component.scss']
})
export class UpdateMedecinComponent implements OnInit {
  // Declaration des Attributs
  medecin: Medecin = new Medecin();
  id: String;

  constructor(
    private medecinService: MedecinService,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.medecin = this.authService.getUser();
    this.getAdresse()
  }

  // Vérifie si l'utilisateur a une adresse sinon en crée une nouvelle 
  getAdresse() {
    if (!this.authService.getUser().adresse) {
      this.medecin.adresse = new Adresse()
    }
  }

  update() : void{
    
    this.medecinService.update(this.medecin).subscribe(response => {
      this.authService.updateCurrentUser(this.medecin)

        this.router.navigate(['/medecin']);
    });
  }

  delete(){
    this.medecinService.delete(this.medecin.id).subscribe((response : any)=> {
        this.authService.logOut();
        this.router.navigate(['']);
    });
  }

  annuler() : void{
    this.router.navigate(['/medecin']);
  }

}
