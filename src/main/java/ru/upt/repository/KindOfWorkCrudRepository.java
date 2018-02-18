package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.KindOfWork;

public interface KindOfWorkCrudRepository extends CrudRepository<KindOfWork, Long> {
}
