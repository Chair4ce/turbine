package squadron.manager.turbine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableAsync
public class TurbineApplication {

    public static void main(String[] args) {
        SpringApplication.run(TurbineApplication.class, args);
    }
    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}
