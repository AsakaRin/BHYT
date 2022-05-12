import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module"
import { PagesRoutes } from './pages.routing';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PaymentComponent } from './payment/payment.component';
import { InformComponent } from './inform/inform.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [DashboardComponent, NavBarComponent, CalculatorComponent, PaymentComponent, InformComponent, UpdateComponent],
  imports: [
    RouterModule.forChild(PagesRoutes),
    SharedModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
  entryComponents: [PaymentComponent]
})

export class PagesModule {

}
