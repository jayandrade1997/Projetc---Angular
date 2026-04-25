import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReservationFormComponent } from '../reservation-form/reservation-form';

@Component({
  selector: 'app-create-reservation-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReservationFormComponent],
  templateUrl: './create-reservation-page.html',
  styleUrl: './create-reservation-page.css',
})
export class CreateReservationPageComponent {}
