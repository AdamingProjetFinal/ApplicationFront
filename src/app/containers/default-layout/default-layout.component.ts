import { AuthentificationService } from './../../service/authentification/authentification.service';
import { Router } from '@angular/router';
import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private router: Router,
    private authentificationService :AuthentificationService){}
ngOnInit(){}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    console.log(sessionStorage);
    
    this.authentificationService.logOut()
    console.log(sessionStorage);
  }
}
