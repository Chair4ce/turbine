package squadron.manager.turbine.incrementLog;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AFSCIncrementRepository extends JpaRepository<AFSCIncrementLog, Long> {

    AFSCIncrementLog findByPasCodeAndMbrIdAndIncrementType(String pas, String mbrId, String iType);
    void deleteAllByPasCode(String pas);
    List<AFSCIncrementLog> findAllByAfsc(String afsc);
}
