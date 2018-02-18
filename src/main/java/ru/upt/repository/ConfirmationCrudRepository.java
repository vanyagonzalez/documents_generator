package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.Confirmation;

public interface ConfirmationCrudRepository extends CrudRepository<Confirmation, Long> {
}
