package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.ConstructionObject;

public interface ConstructionObjectCrudRepository extends CrudRepository<ConstructionObject, Long> {
}
