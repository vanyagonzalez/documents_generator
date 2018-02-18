package ru.upt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.upt.model.ConstructionObject;
import ru.upt.model.Organization;
import ru.upt.repository.ConstructionObjectCrudRepository;
import ru.upt.repository.OrganizationCrudRepository;
import ru.upt.test.EmployeeRepository;
import ru.upt.test.ManagerRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ConstructionObjectCrudRepository constructionObjects;
    private final OrganizationCrudRepository organizations;
    private final EmployeeRepository employees;
    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(ConstructionObjectCrudRepository constructionObjects,
                          OrganizationCrudRepository organizations,
                          EmployeeRepository employees,
                          ManagerRepository managers) {
        this.constructionObjects = constructionObjects;
        this.organizations = organizations;
        this.employees = employees;
        this.managers = managers;
    }

    @Override
    public void run(String... strings) throws Exception {
        Organization customer1 = this.organizations.save(new Organization("Застройщик 1", "ОГРН застройщика", "ИНН застройщика"));
        Organization customer2 = this.organizations.save(new Organization("Застройщик 2", "ОГРН застройщика", "ИНН застройщика"));
        Organization developer1 = this.organizations.save(new Organization("Застройщик 1", "ОГРН застройщика", "ИНН застройщика"));
        Organization developer2 = this.organizations.save(new Organization("Застройщик 2", "ОГРН застройщика", "ИНН застройщика"));

        this.constructionObjects.save(new ConstructionObject("Объект строительства 1", "код 1", customer1, developer1));
        this.constructionObjects.save(new ConstructionObject("Объект строительства 2", "код 2", customer2, developer2));

        /*Manager greg = this.managers.save(new Manager("greg", "turnquist",
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

        SecurityContextHolder.clearContext();*/
    }
}
