package squadron.manager.turbine.airman;

import mil.af.us.narwhal.flight.Flight;
import mil.af.us.narwhal.flight.FlightRepository;
import mil.af.us.narwhal.rank.Rank;
import mil.af.us.narwhal.rank.RankRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirmanService {
  private AirmanRepository airmanRepository;
  private FlightRepository flightRepository;
  private RankRepository rankRepository;

  public AirmanService(
    AirmanRepository airmanRepository,
    FlightRepository flightRepository,
    RankRepository rankRepository
  ) {
    this.airmanRepository = airmanRepository;
    this.flightRepository = flightRepository;
    this.rankRepository = rankRepository;
  }

  public Airman getAirman(Long airmanId) {
    return airmanRepository.findOne(airmanId);
  }

  public List<Airman> getAirmenBySite(Long siteId) {
    return airmanRepository.findAllBySiteIdAndByOrderByLastName(siteId);
  }

  public Airman updateAirman(AirmanJSON json) {
    final Airman airman = airmanRepository.findOne(json.getId());
    final Rank rank = rankRepository.findOne(json.getRank().getId());
    final Flight flight = flightRepository.findOne(json.getFlightId());
    return setAirmanAttributes(json, airman, rank, flight);
  }

  public Airman createAirman(AirmanJSON json) {
    final Rank rank = rankRepository.findOne(json.getRank().getId());
    final Flight flight = flightRepository.findOne(json.getFlightId());
    return setAirmanAttributes(json, new Airman(), rank, flight);
  }

  private Airman setAirmanAttributes(AirmanJSON json, Airman airman, Rank rank, Flight flight) {
    airman.setRank(rank);
    airman.setLastName(json.getLastName());
    airman.setFirstName(json.getFirstName());
    airman.setRemarks(json.getRemarks());
    airman.setFlight(flight);
    airman.setShift(json.getShift());
    json.getSchedules().stream()
      .filter(airmanSchedule -> airmanSchedule.getId() == null)
      .findFirst()
      .ifPresent(airman::addSchedule);
    return airmanRepository.save(airman);
  }

  public void deleteAirman(Long id) {
    airmanRepository.delete(id);
  }
}
