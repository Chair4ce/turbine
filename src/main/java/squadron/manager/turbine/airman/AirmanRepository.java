package squadron.manager.turbine.airman;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AirmanRepository extends JpaRepository<Airman, Long> {
  @Query("select a from Airman a where a.flight.squadron.site.id = ?1 ORDER BY a.lastName")
  List<Airman> findAllBySiteIdAndByOrderByLastName(Long siteId);
void deleteAirmanById(Long id);
  Airman findOneByFirstNameAndLastName(String firstName, String lastName);
}
