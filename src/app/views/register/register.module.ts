import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
    imports: [
      TabsModule
    ],
    declarations: [ RegisterComponent ]
  })
  export class RegisterModule { }
  