package squadron.manager.turbine.manningChart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AFSCIncrementRepository extends JpaRepository<AFSCIncrementLog, Long> {

    AFSCIncrementLog findByPasCodeAndMbrIdAndIncrementType(String pas, String mbrId, String iType);
    void deleteAllByPasCode(String pas);
    List<AFSCIncrementLog> findAllByAfscAndIncrementType(String afsc, String itype);
}
