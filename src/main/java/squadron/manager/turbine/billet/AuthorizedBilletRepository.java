package squadron.manager.turbine.billet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorizedBilletRepository extends JpaRepository<AuthorizedBillet, Long> {
    AuthorizedBillet findByPosNrAndPasCode(String posNr, String pasCode);
}
