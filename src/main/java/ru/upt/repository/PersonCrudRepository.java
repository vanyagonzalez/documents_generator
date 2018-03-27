package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.Person;

public interface PersonCrudRepository extends CrudRepository<Person, Long> {
}
