package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.BuildingObject;

public interface BuildingObjectCrudRepository extends CrudRepository<BuildingObject, Long> {
}
