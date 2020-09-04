package squadron.manager.turbine.doubleBilleted;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoubleBilletedRepository extends JpaRepository<DoubleBilleted, Long> {
   void deleteAllByPasCode(String pasCode);
}
