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

@NgModule({
  declarations: [DashboardComponent, NavBarComponent, CalculatorComponent, PaymentComponent, InformComponent],
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
