package ru.upt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectCrudRepository;
import ru.upt.test.Employee;
import ru.upt.test.EmployeeRepository;
import ru.upt.test.Manager;
import ru.upt.test.ManagerRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final BuildingObjectCrudRepository buildingObjectCrudRepository;
    private final EmployeeRepository employees;
    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(BuildingObjectCrudRepository buildingObjectCrudRepository,
                          EmployeeRepository employees,
                          ManagerRepository managers) {
        this.buildingObjectCrudRepository = buildingObjectCrudRepository;
        this.employees = employees;
        this.managers = managers;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 1", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 2", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 3", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 4", null));

        Manager greg = this.managers.save(new Manager("greg", "turnquist",
                "ROLE_MANAGER"));
        Manager oliver = this.managers.save(new Manager("oliver", "gierke",
                "ROLE_MANAGER"));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(new Employee("Frodo", "Baggins", "ring bearer", greg));
        this.employees.save(new Employee("Bilbo", "Baggins", "burglar", greg));
        this.employees.save(new Employee("Gandalf", "the Grey", "wizard", greg));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(new Employee("Samwise", "Gamgee", "gardener", oliver));
        this.employees.save(new Employee("Merry", "Brandybuck", "pony rider", oliver));
        this.employees.save(new Employee("Peregrin", "Took", "pipe smoker", oliver));

        SecurityContextHolder.clearContext();
    }
}
