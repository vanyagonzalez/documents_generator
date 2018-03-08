package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Employee;
import ru.upt.repository.EmployeeCrudRepository;
import ru.upt.service.EmployeeService;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeCrudRepository employeeCrudRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeCrudRepository employeeCrudRepository) {
        this.employeeCrudRepository = employeeCrudRepository;
    }

    @Override
    public List<Employee> getAll() {
        List<Employee> target = new ArrayList<Employee>();
        employeeCrudRepository.findAll().forEach(target::add);
        return target;
    }
}
