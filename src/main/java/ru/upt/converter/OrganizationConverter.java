package ru.upt.converter;

import ru.upt.dto.BasicOrganizationDto;
import ru.upt.model.Organization;

public class OrganizationConverter {
    public static BasicOrganizationDto convertToBasicDto(Organization organization) {
        return new BasicOrganizationDto(organization.getId(), organization.getName());
    }
}
