package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Person;
import ru.upt.repository.PersonCrudRepository;
import ru.upt.service.PersonService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {
    private final PersonCrudRepository personCrudRepository;

    @Autowired
    public PersonServiceImpl(PersonCrudRepository personCrudRepository) {
        this.personCrudRepository = personCrudRepository;
    }

    @Override
    public List<Person> getAll() {
        List<Person> target = new ArrayList<Person>();
        personCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public Person getById(Long id) {
        return personCrudRepository.findOne(id);
    }

    @Override
    public Person save(Person person) {
        return personCrudRepository.save(person);
    }

    @Override
    public void delete(Person employee) {
        personCrudRepository.delete(employee);
    }
}
