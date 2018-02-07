package ru.upt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectCrudRepository;
import ru.upt.test.Employee;
import ru.upt.test.EmployeeRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final BuildingObjectCrudRepository buildingObjectCrudRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public DatabaseLoader(BuildingObjectCrudRepository buildingObjectCrudRepository, EmployeeRepository employeeRepository) {
        this.buildingObjectCrudRepository = buildingObjectCrudRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 1", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 2", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 3", null));
        this.buildingObjectCrudRepository.save(new BuildingObject("Объект строительства 4", null));

        this.employeeRepository.save(new Employee("Frodo", "Baggins", "ring bearer"));
    }
}
