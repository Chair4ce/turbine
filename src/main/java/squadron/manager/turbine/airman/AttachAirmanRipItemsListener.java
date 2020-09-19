package squadron.manager.turbine.airman;

import mil.af.us.narwhal.rip_item.RipItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.PrePersist;

@Service
public class AttachAirmanRipItemsListener {
  private static RipItemRepository ripItemRepository;

  @Autowired
  public void init(RipItemRepository ripItemRepository) {
    AttachAirmanRipItemsListener.ripItemRepository = ripItemRepository;
  }

  @PrePersist
  public void attachAirmanRipItems(final Airman airman) {
    ripItemRepository.findAll().forEach(item -> airman.addRipItem(new AirmanRipItem(item)));
  }
}
