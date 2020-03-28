package squadron.manager.turbine.positions;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorizedBilletRepository extends JpaRepository<AuthorizedBillet, Long> {
    AuthorizedBillet findByPosNr(String posNr);
}
