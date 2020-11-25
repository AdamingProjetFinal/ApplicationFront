import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../model/Patient';
import { AlerteService } from '../../service/alerte/alerte.service';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { PatientService } from '../../service/patient/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {
  // Declaration des attributs
  id: string;
  patient: Patient;
  newPassWord : string
  newPassWordCheck : string
  oldPassWord : string
  
  constructor(
    private patientService: PatientService,
    private activatedRoute : ActivatedRoute, 
    private authService : AuthentificationService,
    private router : Router,
    private alerteService: AlerteService
  ) { }

  ngOnInit() {
    this.patient = this.authService.getUser();
  }

  update() : void{
    if (this.oldPassWord == this.patient.password) {
      if (this.newPassWord == this.newPassWordCheck) {
        this.patient.password = this.newPassWord
      } else {
        // TODO mot de passe différent
      }
      
    } else {
      // TODO afficehr message ancien mot de passe incorrect
    }
    this.patientService.update(this.patient).subscribe(response => {
      this.authService.updateCurrentUser(this.patient)
        this.router.navigate(['/patient']);
    });
  }

  delete(){
    this.patientService.delete(this.patient.id).subscribe((response : any)=> {
        this.authService.logOut();
        this.router.navigate(['']);
    });
  }

  annuler() : void{
    this.router.navigate(['/patient']);
  }

}
