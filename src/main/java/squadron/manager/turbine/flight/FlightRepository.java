package squadron.manager.turbine.flight;


import org.springframework.data.jpa.repository.JpaRepository;
import squadron.manager.turbine.squadron.Squadron;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
  List<Flight> findAllBySquadron(Squadron squadron);
}
