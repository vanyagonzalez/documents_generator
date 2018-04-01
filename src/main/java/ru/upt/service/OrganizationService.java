package ru.upt.service;

import ru.upt.model.Organization;

import java.util.List;

public interface OrganizationService {
    List<Organization> getAll();
    Organization getById(Long id);
    Organization save(Organization organization);
    void delete(Organization organization);
}
