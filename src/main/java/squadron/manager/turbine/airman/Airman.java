package squadron.manager.turbine.airman;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import squadron.manager.turbine.flight.Flight;
import squadron.manager.turbine.rank.grade;

import javax.persistence.*;

@SuppressWarnings("Duplicates")
@Entity
@Data
@NoArgsConstructor
public class Airman {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String firstName;

  private String lastName;

  private String remarks;

  @ManyToOne
  @JoinColumn(name = "grade_id", nullable = false)
  private grade grade;

  @JsonIgnore
  @ManyToOne(optional = false)
  private Flight flight;


  public Airman(Flight flight, String firstName, String lastName, grade grade) {
    this.flight = flight;
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
  }

  public Long getFlightId() {
    return flight.getId();
  }

  public Long getSquadronId() {
    return flight.getSquadron().getId();
  }

  public Long getSiteId() {
    return flight.getSquadron().getSite().getId();
  }

//  public boolean addRipItem(AirmanRipItem airmanRipItem) {
//    for (AirmanRipItem rip : ripItems) {
//      if (rip.getRipItem().getId().equals(airmanRipItem.getRipItem().getId())) {
//        return false;
//      }
//    }
//    airmanRipItem.setAirman(this);
//    ripItems.add(airmanRipItem);
//    return true;
//  }

//  public AirmanRipItem updateRipItem(long id, Instant expirationDate) {
//    final Optional<AirmanRipItem> optional = ripItems.stream()
//      .filter(ripItem -> ripItem.getId().equals(id))
//      .findFirst();
//    if (optional.isPresent()) {
//      final AirmanRipItem airmanRipItem = optional.get();
//      airmanRipItem.setExpirationDate(expirationDate);
//      return airmanRipItem;
//    }
//    return null;
//  }
//
//  public boolean addQualification(AirmanQualification airmanQualification) {
//    for (AirmanQualification qual : qualifications) {
//      if (qual.getQualification().getId().equals(airmanQualification.getQualification().getId())) {
//        return false;
//      }
//    }
//    airmanQualification.setAirmanId(this.id);
//    qualifications.add(airmanQualification);
//    return true;
//  }

//  public boolean addCertification(AirmanCertification airmanCertification) {
//    for (AirmanCertification cert : certifications) {
//      if (cert.getCertification().getId().equals(airmanCertification.getCertification().getId())) {
//        return false;
//      }
//    }
//    airmanCertification.setAirmanId(this.id);
//    certifications.add(airmanCertification);
//    return true;
//  }

//  public void updateCertification(
//    long id,
//    Instant earnDate,
//    Instant periodicDue,
//    Instant lastSat,
//    Instant currencyExpiration
//  ) {
//    updateSkill(id, earnDate, periodicDue, currencyExpiration, lastSat);
//  }
//
//  public void updateQualification(
//    long id,
//    Instant earnDate,
//    Instant periodicDue,
//    Instant lastSat,
//    Instant currencyExpiration
//  ) {
//    qualifications.stream()
//      .filter(qual -> qual.getId().equals(id))
//      .findFirst()
//      .ifPresent(qual -> {
//        qual.setEarnDate(earnDate);
//        qual.setPeriodicDue(periodicDue);
//        qual.setCurrencyExpiration(currencyExpiration);
//        qual.setLastSat(lastSat);
//      });
//  }

//  public void deleteQualification(Long id) {
//    qualifications.removeIf(qualification -> qualification.getId().equals(id));
//  }
//
//  public void deleteCertification(Long id) {
//    certifications.removeIf(certification -> certification.getId().equals(id));
//  }
//
//  public void addSchedule(AirmanSchedule schedule) {
//    this.schedules.stream()
//      .filter(airmanSchedule -> airmanSchedule.getEndDate() == null)
//      .findFirst()
//      .ifPresent(oldSchedule -> oldSchedule.setEndDate(schedule.getStartDate()));
//
//    schedule.setAirman(this);
//    this.schedules.add(schedule);
//  }
//
//  private void updateSkill(long id, Instant earnDate, Instant periodicDue, Instant currencyExpiration, Instant lastSat) {
//    certifications.stream()
//      .filter(cert -> cert.getId().equals(id))
//      .findFirst()
//      .ifPresent(cert -> {
//        cert.setEarnDate(earnDate);
//        cert.setPeriodicDue(periodicDue);
//        cert.setCurrencyExpiration(currencyExpiration);
//        cert.setLastSat(lastSat);
//      });
//  }
}
