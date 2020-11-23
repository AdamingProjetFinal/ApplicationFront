import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlerteService } from '../../service/alerte/alerte.service';

@Component({
    selector: 'app-Alerte',
    templateUrl: './Alerte.component.html',
    styleUrls: ['./Alerte.component.scss']
})
export class AlerteComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    messages: any[];

    constructor(private alerteService: AlerteService) { }

    ngOnInit() {
        this.subscription = this.alerteService.getAlert()
            .subscribe(messages => {
                console.log(messages);
                
                for (let message of messages) {
                    switch (message && message.type) {
                        case 'success':
                            message.cssClass = 'alert alert-success';
                            message.type = 'success';
                            break;
                        case 'error':
                            message.cssClass = 'alert alert-danger';
                            message.type = 'danger';
                            break;
                    }    
                }

                this.messages = messages;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
