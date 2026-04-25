package com.devsenior.jayandrade.reservation.Repository;

import com.devsenior.jayandrade.reservation.entity.Reservation;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	boolean existsByDateAndTime(LocalDate date, LocalTime time);
}
