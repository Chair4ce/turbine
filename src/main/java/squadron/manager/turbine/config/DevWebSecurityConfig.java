package squadron.manager.turbine.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Profile("!cloud")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class DevWebSecurityConfig extends SharedWebSecurityConfig {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);

    http
      .formLogin()
      .and()
      .httpBasic()
      .and()
      .csrf()
      .disable();
  }
}
