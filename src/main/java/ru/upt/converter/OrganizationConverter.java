package ru.upt.converter;

import ru.upt.dto.BasicOrganizationDto;
import ru.upt.model.Organization;

public class OrganizationConverter {
    public static BasicOrganizationDto convertToBasicDto(Organization organization) {
        return organization != null ? new BasicOrganizationDto(organization.getId(), organization.getName()) : null;
    }

    public static Organization convertFromBasicDto(BasicOrganizationDto basicOrganizationDto) {
        if (basicOrganizationDto == null || basicOrganizationDto.getId() == null) {
            return null;
        }
        Organization organization = new Organization();
        organization.setId(basicOrganizationDto.getId());
        organization.setName(basicOrganizationDto.getName());

        return organization;
    }
}
