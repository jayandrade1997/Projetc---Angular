package com.devsenior.jayandrade.reservation.controller;

import com.devsenior.jayandrade.reservation.entity.Reservation;
import com.devsenior.jayandrade.reservation.exception.BusinessRuleException;
import com.devsenior.jayandrade.reservation.service.ReservationService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/reservas")
@RequiredArgsConstructor
public class ReservationController {

	private final ReservationService reservationService;

	@GetMapping
	public ResponseEntity<List<Reservation>> listReservations() {
		return ResponseEntity.ok(reservationService.listReservations());
	}

	@PostMapping
	public ResponseEntity<Reservation> createReservation(@RequestBody CreateReservationRequest request) {
		Reservation created = reservationService.createReservation(
				request.getClientName(),
				request.getDate(),
				request.getTime(),
				request.getService());
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
		reservationService.cancelReservation(id);
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(BusinessRuleException.class)
	public ResponseEntity<String> handleBusinessRule(BusinessRuleException exception) {
		HttpStatus status = exception.getMessage() != null && exception.getMessage().startsWith("No reservation found")
				? HttpStatus.NOT_FOUND
				: HttpStatus.CONFLICT;
		return ResponseEntity.status(status).body(exception.getMessage());
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class CreateReservationRequest {

		private String clientName;
		private LocalDate date;
		private LocalTime time;
		private String service;
	}
}

