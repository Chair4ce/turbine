package squadron.manager.turbyne;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TurbyneApplication {

    public static void main(String[] args) {
        SpringApplication.run(TurbyneApplication.class, args);
    }

}
