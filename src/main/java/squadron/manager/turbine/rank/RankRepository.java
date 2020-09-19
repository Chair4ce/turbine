package squadron.manager.turbine.rank;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RankRepository extends JpaRepository<Rank, Long> {
  Rank findRankByAbbreviation(String abbreviation);
}
