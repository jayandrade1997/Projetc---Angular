import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation-service';
import { ErrorToastComponent } from '../error-toast/error-toast';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ErrorToastComponent],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationFormComponent {
  private formBuilder = inject(FormBuilder);
  private reservationService = inject(ReservationService);

  reservationCreated = output<void>();

  saving = signal(false);
  saveError = signal('');
  saveSuccess = signal('');
  services = ['Corte de cabello', 'Manicure', 'Pedicure', 'Masaje relajante', 'Limpieza facial'];

  reservationForm = this.formBuilder.nonNullable.group({
    nombreCliente: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    servicio: ['', Validators.required],
  });

  submit(): void {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveError.set('');
    this.saveSuccess.set('');

    const { nombreCliente, fecha, hora, servicio } = this.reservationForm.getRawValue();

    this.reservationService.createReservation({
      clientName: nombreCliente,
      date: fecha,
      time: hora,
      service: servicio,
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.saveSuccess.set('Reserva creada con éxito.');
        this.reservationForm.reset({
          nombreCliente: '',
          fecha: '',
          hora: '',
          servicio: '',
        });
        this.reservationCreated.emit();
        setTimeout(() => this.saveSuccess.set(''), 2800);
      },
      error: (error: { error?: string }) => {
        this.saving.set(false);
        this.saveSuccess.set('');
        this.saveError.set(error.error ?? 'No se pudo guardar la reserva.');
      },
    });
  }
}
