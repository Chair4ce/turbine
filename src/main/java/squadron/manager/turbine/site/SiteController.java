package squadron.manager.turbine.site;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(SiteController.URI)
public class SiteController {
  public static final String URI = "/api/sites";

  SiteRepository siteRepository;

  public SiteController(SiteRepository siteRepository) {
    this.siteRepository = siteRepository;
  }

  @GetMapping
  public List<Site> index() {
    return siteRepository.findAll();
  }

  @GetMapping(path = "/{siteId}")
  public Site show(@PathVariable Long siteId) {
    return siteRepository.findOne(siteId);
  }
}
