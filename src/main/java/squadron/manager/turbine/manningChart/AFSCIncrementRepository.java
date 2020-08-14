package squadron.manager.turbine.manningChart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AFSCIncrementRepository extends JpaRepository<AFSCIncrementLog, Long> {

    AFSCIncrementLog findByPasCodeAndMbrId(String pas, String mbrId);
}
