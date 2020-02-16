package squadron.manager.turbine.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurbineUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthGroupRepository authGroupRepository;

    public TurbineUserDetailsService(UserRepository userRepository, AuthGroupRepository authGroupRepository) {
        super();
        this.userRepository = userRepository;
        this.authGroupRepository = authGroupRepository;
    }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = this.userRepository.findByUsername(username);
            if(null==user){
                throw new UsernameNotFoundException("User not found");
            }
            List<AuthGroup> authGroups = this.authGroupRepository.findByUsername(username);
            return new TurbineUserPrinciple(user, authGroups);
        }
}
