package squadron.manager.turbine.flight;

import mil.af.us.narwhal.squadron.Squadron;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
  List<Flight> findAllBySquadron(Squadron squadron);
}
