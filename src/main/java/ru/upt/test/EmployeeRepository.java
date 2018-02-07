package ru.upt.test;

import org.springframework.data.repository.CrudRepository;

public interface  EmployeeRepository extends CrudRepository<Employee, Long> {
}
