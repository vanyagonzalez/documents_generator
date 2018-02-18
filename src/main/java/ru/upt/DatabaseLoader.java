package ru.upt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.upt.model.*;
import ru.upt.repository.*;
import ru.upt.test.EmployeeRepository;
import ru.upt.test.ManagerRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ConstructionObjectCrudRepository constructionObjects;
    private final OrganizationCrudRepository organizations;
    private final ProjectPartitionCrudRepository projectPartitions;
    private final ProjectDocumentCrudRepository projectDocuments;
    private final DocumentationSheetCrudRepository documentationSheets;
    private final KindOfWorkCrudRepository kindOfWorks;
    private final EmployeeRepository employees;
    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(ConstructionObjectCrudRepository constructionObjects,
                          OrganizationCrudRepository organizations,
                          ProjectPartitionCrudRepository projectPartitions,
                          ProjectDocumentCrudRepository projectDocuments,
                          DocumentationSheetCrudRepository documentationSheets,
                          KindOfWorkCrudRepository kindOfWorks,
                          EmployeeRepository employees,
                          ManagerRepository managers) {
        this.constructionObjects = constructionObjects;
        this.organizations = organizations;
        this.projectPartitions = projectPartitions;
        this.projectDocuments = projectDocuments;
        this.documentationSheets = documentationSheets;
        this.kindOfWorks = kindOfWorks;
        this.employees = employees;
        this.managers = managers;
    }

    @Override
    public void run(String... strings) throws Exception {
        for (int i = 1; i < 3; i++) {
            Organization customer = organizations.save(new Organization("Заказчик " + i, "ОГРН заказчика " + i, "ИНН заказчика " + i));
            Organization developer = organizations.save(new Organization("Заказчик " + i, "ОГРН заказчика " + i, "ИНН заказчика " + i));
            ConstructionObject co = this.constructionObjects.save(
                    new ConstructionObject("Объект строительства "  + i, "код " + i, customer, developer)
            );

            for (int j = 1; j < 4; j++) {
                ProjectPartition pp = projectPartitions.save(new ProjectPartition(
                        String.format("Раздел проекта %s для объекта %s", j, i),
                        String.format("код %s%s", i, j),
                        co
                ));

                for (int k = 1; k < 4; k++) {
                    ProjectDocument pd =  projectDocuments.save(new ProjectDocument(
                            String.format("Проектная документация %s для раздела %s%s", k, i, j),
                            String.format("код %s%s%s", i, j, k),
                            pp
                    ));

                    for (int q = 1; q < 4; q++) {
                        DocumentationSheet ds = documentationSheets.save(new DocumentationSheet(
                                String.format("лист %s для документации %s%s%s", q, i, j, k),
                                pd
                        ));
                        for (int w = 1; w < 4; w++) {
                            kindOfWorks.save(new KindOfWork(
                                    String.format("Вид работы %s%s%s%s%s", i, j, k, q, w),
                                    ds
                            ));
                        }
                    }
                }
            }

        }

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
