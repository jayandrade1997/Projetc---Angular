import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation-service';

@Component({
  selector: 'app-reservation-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './reservation-table.html',
  styleUrl: './reservation-table.css',
})
export class ReservationTableComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations = signal<Reservation[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  hasReservations = computed(() => this.reservations().length > 0);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.reservationService.getAllReservation().subscribe({
      next: (data) => {
        this.reservations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las reservas.');
        this.loading.set(false);
      },
    });
  }

  cancelReservation(id: number): void {
    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.reservations.update((items) => items.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'CANCELLED' } : reservation,
        ));
      },
      error: () => {
        this.errorMessage.set('No se pudo cancelar la reserva.');
      },
    });
  }

  isCancelled(status: string): boolean {
    return status === 'CANCELLED';
  }
}
