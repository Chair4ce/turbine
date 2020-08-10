package squadron.manager.turbine.position;

import lombok.*;

import java.util.Date;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
public class DoubleBilletJSON {

        private Long id;

        private String pasCode;

        private String mbrId;

        private String posNr;

        private Date lastUpdated;
}
