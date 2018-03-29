package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Employee;
import ru.upt.model.Organization;
import ru.upt.repository.EmployeeCrudRepository;
import ru.upt.repository.OrganizationCrudRepository;
import ru.upt.repository.PersonCrudRepository;
import ru.upt.service.EmployeeService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeCrudRepository employeeCrudRepository;
    private final PersonCrudRepository personCrudRepository;
    private final OrganizationCrudRepository organizationCrudRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeCrudRepository employeeCrudRepository, PersonCrudRepository personCrudRepository, OrganizationCrudRepository organizationCrudRepository) {
        this.employeeCrudRepository = employeeCrudRepository;
        this.personCrudRepository = personCrudRepository;
        this.organizationCrudRepository = organizationCrudRepository;
    }

    @Override
    public List<Employee> getAll() {
        List<Employee> target = new ArrayList<Employee>();
        employeeCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public Employee getById(Long id) {
        return employeeCrudRepository.findOne(id);
    }

    @Override
    public Employee save(Employee employee) {
        //todo не возвращает значения полей у объектов после сохранения
        Employee saved = employeeCrudRepository.save(employee);
        if (saved.getPerson() != null) {
            saved.setPerson(personCrudRepository.findOne(saved.getPerson().getId()));
        }
        if (saved.getOrganization() != null) {
            saved.setOrganization(organizationCrudRepository.findOne(saved.getOrganization().getId()));
        }
        return saved;
    }
}
