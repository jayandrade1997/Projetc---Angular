import { inject, Injectable } from '@angular/core';
import { CreateReservationRequest, Reservation } from '../models/reservation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/reservas`;

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  createReservation(reservation: CreateReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl, reservation);
  }

  cancelReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}

