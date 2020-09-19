package squadron.manager.turbine.config;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import squadron.manager.turbine.profile.ProfileService;

@Profile("cloud")
@Configuration
@EnableOAuth2Sso
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CloudWebSecurityConfig extends SharedWebSecurityConfig {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        http
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

    @Bean
    PrincipalExtractor principalExtractor(ProfileService profileService) {
        return new GeoAxisPrincipalExtractor(profileService);
    }

    @Bean
    AuthoritiesExtractor authoritiesExtractor(ProfileService profileService) {
        return new GeoAxisAuthoritiesExtractor(profileService);
    }

}
