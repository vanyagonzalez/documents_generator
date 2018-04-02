package ru.upt.service;

import ru.upt.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    Employee getById(Long id);
    Employee save(Employee employee);
    void delete(Employee employee);
}
