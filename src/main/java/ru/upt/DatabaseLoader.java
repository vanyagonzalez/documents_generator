package ru.upt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.upt.model.*;
import ru.upt.repository.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ConstructionObjectCrudRepository constructionObjects;
    private final OrganizationCrudRepository organizations;
    private final ProjectPartitionCrudRepository projectPartitions;
    private final ProjectDocumentCrudRepository projectDocuments;
    private final DocumentationSheetCrudRepository documentationSheets;
    private final KindOfWorkCrudRepository kindOfWorks;
    private final EmployeeCrudRepository employees;
    private final CertificateCrudRepository certificates;
    private final ConfirmationCrudRepository confirmations;
//    private final EmployeeRepository employees;
//    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(ConstructionObjectCrudRepository constructionObjects,
                          OrganizationCrudRepository organizations,
                          ProjectPartitionCrudRepository projectPartitions,
                          ProjectDocumentCrudRepository projectDocuments,
                          DocumentationSheetCrudRepository documentationSheets,
                          KindOfWorkCrudRepository kindOfWorks,
                          EmployeeCrudRepository employees,
                          CertificateCrudRepository certificates,
                          ConfirmationCrudRepository confirmations) {
        this.constructionObjects = constructionObjects;
        this.organizations = organizations;
        this.projectPartitions = projectPartitions;
        this.projectDocuments = projectDocuments;
        this.documentationSheets = documentationSheets;
        this.kindOfWorks = kindOfWorks;
        this.employees = employees;
        this.certificates = certificates;
        this.confirmations = confirmations;
    }

    @Override
    public void run(String... strings) throws Exception {
        Set<Certificate> certificateSet = new HashSet<>();
        for (int i = 1; i < 5; i ++) {
            certificateSet.add(certificates.save(new Certificate(
                    "Материал " + i,
                    "Нормативный документ " + i,
                    "Вид документа " + i,
                    "нормер документа " + i,
                    new Date(),
                    new Date(),
                    (double)i,
                    "единица измерения " + i,
                    "скан-копия документа " + i
            )));
        }

        Set<Confirmation> confirmationSet = new HashSet<>();
        for (int i = 1; i < 5; i ++) {
            confirmationSet.add(confirmations.save(new Confirmation(
                    "Наименование документа " + i,
                    "номер документа " + i,
                    new Date(),
                    "скан-копия документа " + i
            )));
        }

        for (int i = 1; i < 3; i++) {
            Organization authorOrg = organizations.save(new Organization("Организация для сотрудников " + i, "ОГРН " + i, "ИНН " + i));
            Organization customer = organizations.save(new Organization("Заказчик " + i, "ОГРН заказчика " + i, "ИНН заказчика " + i));
            Organization developer = organizations.save(new Organization("Застройщик " + i, "ОГРН застройщика " + i, "ИНН застройщика " + i));

            ConstructionObject co = this.constructionObjects.save(
                    new ConstructionObject("Объект строительства "  + i, "код " + i, customer, developer)
            );

            Employee author = employees.save(new Employee(
                    "Фамилия автора " + i,
                    "Имя автора " + i,
                    "Отчество автора " + i,
                    "Должность автора " + i
                    ));

            Set<Employee> authors = new HashSet<>();
            authors.add(author);
            authorOrg.setEmployees(authors);
            organizations.save(authorOrg);

            Employee customerRepresentative = employees.save(new Employee(
                    "Фамилия предст-я Заказчика " + i,
                    "Имя предст-я Заказчика " + i,
                    "Отчество предст-я Заказчика " + i,
                    "Должность предст-я Заказчика " + i
            ));
            Set<Employee> customerRepresentatives = new HashSet<>();
            customerRepresentatives.add(customerRepresentative);
            customer.setEmployees(customerRepresentatives);
            organizations.save(customer);

            Employee developerRepresentative = employees.save(new Employee(
                    "Фамилия предст-я Застройщика " + i,
                    "Имя предст-я Застройщика " + i,
                    "Отчество предст-я Застройщика " + i,
                    "Должность предст-я Застройщика " + i
            ));
            Set<Employee> developerRepresentatives = new HashSet<>();
            developerRepresentatives.add(developerRepresentative);
            developer.setEmployees(developerRepresentatives);
            organizations.save(developer);

            for (int j = 1; j < 3; j++) {
                ProjectPartition pp = projectPartitions.save(new ProjectPartition(
                        String.format("Раздел проекта %s для объекта %s", j, i),
                        String.format("код %s%s", i, j),
                        co
                ));

                for (int k = 1; k < 3; k++) {
                    ProjectDocument pd =  projectDocuments.save(new ProjectDocument(
                            String.format("Проектная документация %s для раздела %s%s", k, i, j),
                            String.format("Шифр %s%s%s", i, j, k),
                            String.format("Стадия %s%s%s", i, j, k),
                            author,
                            customerRepresentative,
                            developerRepresentative,
                            pp
                    ));

                    for (int q = 1; q < 3; q++) {
                        DocumentationSheet ds = documentationSheets.save(new DocumentationSheet(
                                String.format("лист %s для документации %s%s%s", q, i, j, k),
                                Long.parseLong(String.format("%s%s%s%s", i, j, k, q)),
                                (long)q,
                                pd
                        ));

                        Organization executorOrg = organizations.save(new Organization(
                                String.format("Организация - фактически выполнившая работу %s%s%s%s", i, j, k, q),
                                String.format("ОГРН %s%s%s%s", i, j, k, q),
                                String.format("ИНН %s%s%s%s", i, j, k, q)));
                        Set<Employee> executors = new HashSet<>();

                        for (int w = 1; w < 4; w++) {
                            Employee executor = employees.save(new Employee(
                                    String.format("Фамилия %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Имя %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Отчество %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Должность %s%s%s%s%s", i, j, k, q, w)
                            ));
                            executors.add(executor);

                            Set<Employee> otherRepresentatives = new HashSet<>();
                            for (int e = 1; e < 3; e++) {
                                Employee otherEmployee = employees.save(new Employee(
                                        String.format("Представители иных лиц %s%s%s%s%s%s", i, j, k, q, w, e),
                                        String.format("Имя %s%s%s%s%s%s", i, j, k, q, w, e),
                                        String.format("Отчество %s%s%s%s%s%s", i, j, k, q, w, e),
                                        String.format("Должность %s%s%s%s%s%s", i, j, k, q, w, e)
                                ));
                                executors.add(otherEmployee);
                                otherRepresentatives.add(otherEmployee);
                            }

                            kindOfWorks.save(new KindOfWork(
                                    String.format("Вид работы %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Объем работы %s%s%s%s%s", i, j, k, q, w),
                                    String.format("единица измерения работы %s%s%s%s%s", i, j, k, q, w),
                                    executorOrg,
                                    executor,
                                    otherRepresentatives,
                                    certificateSet,
                                    confirmationSet,
                                    String.format("Дополнительные нормативные документы %s%s%s%s%s", i, j, k, q, w),
                                    new Date(),
                                    new Date(),
                                    new Date(),
                                    ds
                            ));
                        }

                        executorOrg.setEmployees(executors);
                        organizations.save(executorOrg);
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
