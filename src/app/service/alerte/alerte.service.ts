import { NavigationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlerteService {

    private subject = new Subject<any[]>();
    private keepAfterRouteChange = false;
    alerte : any[] = [];

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any[]> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alerte.push({ type: 'success', text: message })
        this.subject.next(this.alerte);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alerte.push({ type: 'error', text: message })
        this.subject.next(this.alerte);
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

}
