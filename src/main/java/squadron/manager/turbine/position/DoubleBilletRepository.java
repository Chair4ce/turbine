package squadron.manager.turbine.position;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoubleBilletRepository extends JpaRepository<DoubleBillet, Long> {
    DoubleBillet findByMbrId(String mbrId);
    void deleteByMbrId(String mbrId);

}
