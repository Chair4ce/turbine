package squadron.manager.turbine.admin;


import squadron.manager.turbine.site.Site;
import squadron.manager.turbine.site.SiteRepository;
import squadron.manager.turbine.squadron.Squadron;
import squadron.manager.turbine.squadron.SquadronRepository;

public class AdminSquadronService {
  private SiteRepository siteRepository;
  private SquadronRepository squadronRepository;

  public AdminSquadronService(
    SiteRepository siteRepository,
    SquadronRepository squadronRepository
  ) {
    this.siteRepository = siteRepository;
    this.squadronRepository = squadronRepository;
  }

  public AdminSquadronItemJSON createSquadron(AdminSquadronItemJSON item) {
    Squadron squadron = new Squadron();
    final Site site = this.siteRepository.getOne(item.getSiteId());
    squadron.setSite(site);
    squadron.setName(item.getSquadronName());
    squadron = this.squadronRepository.save(squadron);
    item.setSquadronId(squadron.getId());
    return item;
  }
}
