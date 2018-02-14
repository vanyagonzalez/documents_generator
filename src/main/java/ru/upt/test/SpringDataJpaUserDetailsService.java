package ru.upt.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService /*implements UserDetailsService*/ {

    private final ManagerRepository repository;

    @Autowired
    public SpringDataJpaUserDetailsService(ManagerRepository repository) {
        this.repository = repository;
    }

    /*@Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Manager manager = this.repository.findByName(name);
        return new User(manager.getName(), manager.getPassword(),
                AuthorityUtils.createAuthorityList(manager.getRoles()));
    }*/

}
