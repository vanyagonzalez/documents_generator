package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.Organization;

public interface OrganizationCrudRepository extends CrudRepository<Organization, Long> {
}
