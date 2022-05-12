import { UpdateComponent } from './update/update.component';
import { PaymentComponent } from './payment/payment.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { InformComponent } from './inform/inform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from "@angular/router";

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'inform',
        component: InformComponent
      },
      {
        path: 'inform/update/:id',
        component: UpdateComponent
      },
      {
        path: 'calculator',
        component: CalculatorComponent
      },
    ]
  }
]
