package squadron.manager.turbine.airman;


import org.springframework.stereotype.Service;
import squadron.manager.turbine.flight.Flight;
import squadron.manager.turbine.flight.FlightRepository;
import squadron.manager.turbine.rank.grade;
import squadron.manager.turbine.rank.GradeRepository;

import java.util.List;

@Service
public class AirmanService {
  private AirmanRepository airmanRepository;
  private FlightRepository flightRepository;
  private GradeRepository gradeRepository;

  public AirmanService(
    AirmanRepository airmanRepository,
    FlightRepository flightRepository,
    GradeRepository gradeRepository
  ) {
    this.airmanRepository = airmanRepository;
    this.flightRepository = flightRepository;
    this.gradeRepository = gradeRepository;
  }

  public Airman getAirman(Long airmanId) {
    return airmanRepository.getOne(airmanId);
  }

  public List<Airman> getAirmenBySite(Long siteId) {
    return airmanRepository.findAllBySiteIdAndByOrderByLastName(siteId);
  }

  public Airman updateAirman(AirmanJSON json) {
    final Airman airman = airmanRepository.getOne(json.getId());
    final grade grade = gradeRepository.getOne(json.getGrade().getId());
    final Flight flight = flightRepository.getOne(json.getFlightId());
    return setAirmanAttributes(json, airman, grade, flight);
  }

  public Airman createAirman(AirmanJSON json) {
    final grade grade = gradeRepository.getOne(json.getGrade().getId());
    final Flight flight = flightRepository.getOne(json.getFlightId());
    return setAirmanAttributes(json, new Airman(), grade, flight);
  }

  private Airman setAirmanAttributes(AirmanJSON json, Airman airman, grade grade, Flight flight) {
    airman.setGrade(grade);
    airman.setLastName(json.getLastName());
    airman.setFirstName(json.getFirstName());
    airman.setRemarks(json.getRemarks());
    airman.setFlight(flight);
    return airmanRepository.save(airman);
  }

  public void deleteAirman(Long id) {
    airmanRepository.deleteAirmanById(id);
  }
}
