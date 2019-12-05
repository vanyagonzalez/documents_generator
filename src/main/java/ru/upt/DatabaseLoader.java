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
    private final PersonCrudRepository person;
    private final EmployeeCrudRepository employees;
    private final CertificateCrudRepository certificates;
    private final ConfirmationCrudRepository confirmations;
//    private final EmployeeRepositoryTmp employees;
//    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(ConstructionObjectCrudRepository constructionObjects,
                          OrganizationCrudRepository organizations,
                          ProjectPartitionCrudRepository projectPartitions,
                          ProjectDocumentCrudRepository projectDocuments,
                          DocumentationSheetCrudRepository documentationSheets,
                          KindOfWorkCrudRepository kindOfWorks,
                          PersonCrudRepository person,
                          EmployeeCrudRepository employees,
                          CertificateCrudRepository certificates,
                          ConfirmationCrudRepository confirmations) {
        this.constructionObjects = constructionObjects;
        this.organizations = organizations;
        this.projectPartitions = projectPartitions;
        this.projectDocuments = projectDocuments;
        this.documentationSheets = documentationSheets;
        this.kindOfWorks = kindOfWorks;
        this.person = person;
        this.employees = employees;
        this.certificates = certificates;
        this.confirmations = confirmations;
    }

    @Override
    public void run(String... strings) throws Exception {
        loadData();
    }

    private void loadData() {
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
            Organization authorOrg = organizations.save(
                    new Organization("Организация для сотрудников " + i,
                            "ОГРН " + i,
                            "ИНН " + i,
                            "Номер СРО " + i,
                            "СР выдавшая СРО " + i,
                            new Date(),
                            "Юридический адрес организации " + i,
                            "Номер телефона организации " + i,
                            "Номер факса организации " + i
                            )
            );
            Organization customer = organizations.save(new Organization("Заказчик " + i, "ОГРН заказчика " + i, "ИНН заказчика " + i));
            Organization developer = organizations.save(new Organization("Застройщик " + i, "ОГРН застройщика " + i, "ИНН застройщика " + i));

            ConstructionObject co = this.constructionObjects.save(
                    new ConstructionObject("Объект строительства "  + i, "код " + i, customer, developer)
            );

            Person authorPerson = person.save(new Person(
                    "Фамилия автора " + i,
                    "Имя автора " + i,
                    "Отчество автора " + i));
            Employee author = employees.save(new Employee(
                    authorPerson,
                    authorOrg,
                    "Должность автора " + i,
                    "Приказ автора" + i,
                    new Date()
                    ));

            Person customerRepresentativePerson = person.save(new Person(
                    "Фамилия предст-я Заказчика " + i,
                    "Имя предст-я Заказчика " + i,
                    "Отчество предст-я Заказчика " + i));
            Employee customerRepresentative = employees.save(new Employee(
                    customerRepresentativePerson,
                    customer,
                    "Должность предст-я Заказчика " + i,
                    "Приказ предст-я Заказчика " + i,
                    new Date()
            ));

            Person developerRepresentativePerson = person.save(new Person(
                    "Фамилия предст-я Застройщика " + i,
                    "Имя предст-я Застройщика " + i,
                    "Отчество предст-я Застройщика " + i));
            Employee developerRepresentative = employees.save(new Employee(
                    developerRepresentativePerson,
                    developer,
                    "Должность предст-я Застройщика " + i,
                    "Приказ предст-я Застройщика " + i,
                    new Date()
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

                        Set<Employee> otherRepresentatives = new HashSet<>();
                        for (int e = 1; e < 3; e++) {
                            Person otherEmployeePerson = person.save(new Person(
                                    String.format("Представители иных лиц %s%s%s%s%s", i, j, k, q, e),
                                    String.format("Имя %s%s%s%s%s", i, j, k, q, e),
                                    String.format("Отчество %s%s%s%s%s", i, j, k, q, e)));
                            Employee otherEmployee = employees.save(new Employee(
                                    otherEmployeePerson,
                                    executorOrg,
                                    String.format("Должность %s%s%s%s%s", i, j, k, q, e),
                                    String.format("Приказ %s%s%s%s%s", i, j, k, q, e),
                                    new Date()
                            ));
                            executors.add(otherEmployee);
                            otherRepresentatives.add(otherEmployee);
                        }

                        for (int w = 1; w < 4; w++) {
                            Person executorPerson = person.save(new Person(
                                    String.format("Фамилия %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Имя %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Отчество %s%s%s%s%s", i, j, k, q, w)));
                            Employee executor = employees.save(new Employee(
                                    executorPerson,
                                    executorOrg,
                                    String.format("Должность %s%s%s%s%s", i, j, k, q, w),
                                    String.format("Приказ %s%s%s%s%s", i, j, k, q, w),
                                    new Date()
                            ));
                            executors.add(executor);

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

        this.employees.save(new EmployeeTmp("Frodo", "Baggins", "ring bearer", greg));
        this.employees.save(new EmployeeTmp("Bilbo", "Baggins", "burglar", greg));
        this.employees.save(new EmployeeTmp("Gandalf", "the Grey", "wizard", greg));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(new EmployeeTmp("Samwise", "Gamgee", "gardener", oliver));
        this.employees.save(new EmployeeTmp("Merry", "Brandybuck", "pony rider", oliver));
        this.employees.save(new EmployeeTmp("Peregrin", "Took", "pipe smoker", oliver));

        SecurityContextHolder.clearContext();*/
    }
}
