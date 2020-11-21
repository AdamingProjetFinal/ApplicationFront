import { AlerteService } from './../../../service/alerte/alerte.service';
import { Specialite } from './../../../model/Specialite';
import { SpecialiteService } from './../../../service/specialite/specialite.service';
import { AuthentificationService } from './../../../service/authentification/authentification.service';
import { Medecin } from './../../../model/Medecin';
import { MedecinService } from '../../../service/medecin/medecin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-medecin',
  templateUrl: './forms-medecin.component.html',
  styleUrls: ['./forms-medecin.component.scss']
})
export class FormsMedecinComponent implements OnInit {
  id:string
  medecin:Medecin = new Medecin
  listSpecialites : Specialite[]
  constructor(private medecinService : MedecinService,
              private activatedRoute : ActivatedRoute, 
              private authentificationService : AuthentificationService,
              private specialiteService : SpecialiteService,
              private router : Router,
              private alerteService: AlerteService) { }


  ngOnInit() {
    this.getSepcialites()
    this.recuperationMedecin()
  }

  // Permet de recuperer la liste des spécialités pour le menu déroulant 
  getSepcialites() {
    this.listSpecialites = this.specialiteService.getSpecialites()
  }
  // Permet de récupérer l'id contenu dans l'url, Si il n'y en a pas c'est l'id de l'utilisateur courant qui est pris
  recuperationMedecin() {
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id'] == null) {
        if (this.authentificationService.isUserLoggedIn()) {
          this.id = this.authentificationService.getUserId() // "+" pour convertir un string en number
        }else {
          this.router.navigate([''])
        }
      } else {
        this.id = param['id'];
      }
      
      this.medecinService.getMedecin(this.id).subscribe((value: any) => {
       this.medecin = value.data;
      })
    })
  }
 

  update() : void{
    console.log(this.medecin);
    
    this.medecinService.update(this.medecin).subscribe(response => {
      if (response.status == 200) {
        this.alerteService.success("Le profil a bien été mis a jour")
      } else {
        this.alerteService.error("Le profil n'a pas pu être mis a jour")
      }
    
    });
  }

  delete(){
    this.medecinService.delete(this.medecin.id).subscribe((response : any)=> {
      if (response.status == "OK") {
        this.alerteService.error("Le profil a bien été supprimé")
        this.router.navigate([''])
      } else {
        this.alerteService.error("Erreur lors de la suppression du compte")
      }
    });
  }

  

    

}
