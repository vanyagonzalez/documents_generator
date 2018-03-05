package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Organization;
import ru.upt.repository.OrganizationCrudRepository;
import ru.upt.service.OrganizationService;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationCrudRepository organizationCrudRepository;

    @Autowired
    public OrganizationServiceImpl(OrganizationCrudRepository organizationCrudRepository) {
        this.organizationCrudRepository = organizationCrudRepository;
    }

    @Override
    public List<Organization> getAll() {
        List<Organization> target = new ArrayList<>();
        organizationCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public Organization getById(Long id) {
        return organizationCrudRepository.findOne(id);
    }

    @Override
    public Organization save(Organization organization) {
        return organizationCrudRepository.save(organization);
    }
}
