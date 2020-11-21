import { NavigationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
      // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
      this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              console.log("TODO hello from alerte service")
              if (this.keepAfterRouteChange) {
                  // only keep for a single route change
                  this.keepAfterRouteChange = false;
              } else {
                  // clear alert message
                //   this.clear();
              }
          }
      });
  }

  getAlert(): Observable<any> {
      console.log(this.subject);
      
      return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
      
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'error', text: message });
      console.log('from alerte service error');
  }

  clear() {
      // clear by calling subject.next() without parameters
      this.subject.next();
  }

}
