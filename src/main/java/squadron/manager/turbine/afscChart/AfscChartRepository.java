package squadron.manager.turbine.afscChart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AfscChartRepository extends JpaRepository<AfscChart, Long> {

AfscChart findByAfscAndMonthAndYear(String afsc, int month, int year);
}
