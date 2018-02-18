package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.Employee;

public interface EmployeeCrudRepository extends CrudRepository<Employee, Long> {
}
