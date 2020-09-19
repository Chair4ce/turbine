package squadron.manager.turbine.squadron;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SquadronRepository extends JpaRepository<Squadron, Long> {

  @Query(
    value = "SELECT" +
      "  s.id siteId, " +
      "  s.name siteName, " +
      "  sq.id squadronId, " +
      "  sq.name squadronName, " +
      "  COALESCE( c.squadron_count, 0) airmenCount " +
      "FROM squadron sq JOIN " +
      "  site s ON sq.site_id = s.id " +
      "LEFT OUTER JOIN " +
      "  (Select " +
      "    squadron_id, " +
      "    Count(1) as squadron_count " +
      "    FROM airman a " +
      "    JOIN flight f ON f.id = a.flight_id " +
      "    JOIN squadron s2 on f.squadron_id = s2.id " +
      "    GROUP BY squadron_id " +
      "  ) AS c ON c.squadron_id = sq.id ",
    nativeQuery = true
  )
  Object[][] getAdminSquadrons();
}
