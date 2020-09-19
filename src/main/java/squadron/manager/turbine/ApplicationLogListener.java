package squadron.manager.turbine;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class ApplicationLogListener implements ApplicationListener {
    private static final Logger LOGGER = Logger.getLogger(ApplicationLogListener.class.getName());

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        LOGGER.info("Event Occurred : " + event);
    }
}
