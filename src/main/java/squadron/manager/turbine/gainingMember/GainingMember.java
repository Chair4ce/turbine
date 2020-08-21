package squadron.manager.turbine.gainingMember;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Entity
@Data
@Table(name = "gaining_member")
@DynamicUpdate
public class GainingMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;

    @Column(name= "gaining_pas")
    private String gainingPas;

    @Column(name= "mbr_id")
    private String mbrId;

    @Column(name = "full_name")
    private String fullName;

    private String grade;

    @Column(name = "losing_pas")
    private String losingPas;

    @Column(name = "losing_pas_cleartext")
    private String losingPasCleartext;

    @Column(name = "dafsc")
    private String dafsc;

    @Column(name = "sponsor_id")
    private String sponsorId;

    @Column(name = "dor")
    private Date dor;

    @Column(name = "dos")
    private Date dos;

    @Column(name = "rnltd")
    private Date rnltd;

    @Column(name = "last_updated")
    private Date lastUpdated;

    public GainingMember(String gaining_Pas,String mbrId, String fullName, String grade, String losingPas, String losingPasCleartext, String dafsc, String sponsorId, Date dor, Date dos, Date rnltd, Date lastUpdated) {
        this.gainingPas = gaining_Pas;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.grade = grade;
        this.losingPas = losingPas;
        this.losingPasCleartext = losingPasCleartext;
        this.dafsc = dafsc != null ? dafsc.replaceAll("-", "") : null;
        this.sponsorId = sponsorId;
        this.dor = dor;
        this.dos = dos;
        this.rnltd = rnltd;
        this.lastUpdated = lastUpdated;
    }
}
