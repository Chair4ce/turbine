package squadron.manager.turbine.site;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import squadron.manager.turbine.admin.AdminSiteItemJSON;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {
  Site findOneByName(String name);

  @Query(
    "SELECT " +
      "new squadron.manager.turbine.admin.AdminSiteItemJSON(s.id, s.name) " +
      "FROM Site AS s "
  )
  List<AdminSiteItemJSON> getAdminSites();
}
