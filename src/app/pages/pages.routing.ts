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
        path: 'calculator',
        component: CalculatorComponent
      }
    ]
  }
]
