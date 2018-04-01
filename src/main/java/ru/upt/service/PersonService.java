package ru.upt.service;

import ru.upt.model.Person;

import java.util.List;

public interface PersonService {
    List<Person> getAll();
    Person getById(Long id);
    Person save(Person employee);
    void delete(Person employee);
}
