package com.devsenior.jayandrade.reservation.service;

import com.devsenior.jayandrade.reservation.Repository.ReservationRepository;
import com.devsenior.jayandrade.reservation.entity.Reservation;
import com.devsenior.jayandrade.reservation.entity.ReservationStatus;
import com.devsenior.jayandrade.reservation.exception.BusinessRuleException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

	private final ReservationRepository reservationRepository;

	@Transactional(readOnly = true)
	public List<Reservation> listReservations() {
		return reservationRepository.findAll();
	}

	public Reservation createReservation(String clientName, LocalDate date, LocalTime time, String service) {
		if (reservationRepository.existsByDateAndTime(date, time)) {
			throw new BusinessRuleException("A reservation already exists for the given date and time.");
		}

		Reservation reservation = new Reservation();
		reservation.setClientName(clientName);
		reservation.setDate(date);
		reservation.setTime(time);
		reservation.setService(service);
		reservation.setStatus(ReservationStatus.ACTIVE);
		return reservationRepository.save(reservation);
	}

	public void cancelReservation(Long id) {
		Reservation reservation = reservationRepository
				.findById(id)
				.orElseThrow(() -> new BusinessRuleException("No reservation found with id: " + id));

		if (reservation.getStatus() == ReservationStatus.CANCELLED) {
			throw new BusinessRuleException("The reservation is already cancelled.");
		}

		reservation.setStatus(ReservationStatus.CANCELLED);
		reservationRepository.save(reservation);
	}
}
