import { Admin } from './../../model/Admin';
import { Router } from '@angular/router';
import { AuthentificationService } from './../../service/authentification/authentification.service';
import { AdminService } from './../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit {
  admin : Admin = new Admin();
  newPassWord : string
  newPassWordCheck : string
  oldPassWord : string

  constructor(
    private adminService: AdminService,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.admin = this.authService.getUser()
  }
  update() : void{

    if (this.oldPassWord == this.admin.pwd) {
      if (this.newPassWord == this.newPassWordCheck) {
        this.admin.pwd = this.newPassWord
        this.adminService.update(this.admin).subscribe(response => {
          this.authService.updateCurrentUser(this.admin)
    
            this.router.navigate(['/admin']);
        });
      } else {
        // TODO mot de passe différent
      }
    } 
  }
  annuler() : void{
    this.router.navigate(['/admin']);
  }
}
