import { Routes } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form';
import { ReservationTableComponent } from './components/reservations-page/reservations-page';

export const routes: Routes = [
  { path: "", redirectTo: 'reservas', pathMatch: 'full' },
  { path: 'reservas', component: ReservationTableComponent },
  { path: 'reservas/new', component: ReservationFormComponent },
];
