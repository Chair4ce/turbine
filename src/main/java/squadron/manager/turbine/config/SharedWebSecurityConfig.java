package squadron.manager.turbine.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SharedWebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/positions/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/positions/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/positions/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/members", "/api/members/*").hasAnyRole("ADMIN", "READER")
                .antMatchers(HttpMethod.POST, "/api/members", "/api/members/*").hasAnyRole("ADMIN", "READER")
                .antMatchers(HttpMethod.DELETE, "/api/members", "/api/members/*").hasAnyRole("ADMIN", "READER")
                .anyRequest()
                .authenticated()
                .and()
                .headers()
                .frameOptions()
                .sameOrigin();
    }
}
