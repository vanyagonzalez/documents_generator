package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.BasicOrganizationDto;
import ru.upt.dto.OrganizationDto;
import ru.upt.model.Employee;
import ru.upt.model.Organization;

import java.util.ArrayList;
import java.util.List;

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

    public static OrganizationDto convertToDto(Organization organization) {
        if (organization == null) {
            return null;
        }
        List<BasicEmployeeDto> employees = new ArrayList<>();
        if (organization.getEmployees() != null && !organization.getEmployees().isEmpty()) {
            for (Employee employee : organization.getEmployees()) {
                employees.add(new BasicEmployeeDto(employee.getId(), employee.getSurname(), employee.getName(), employee.getMiddleName()));
            }
        }
        return new OrganizationDto(
                        organization.getId(),
                        organization.getName(),
                organization.getOgrn(),
                organization.getInn(),
                organization.getSroNumber(),
                organization.getOrganizationIssuingSro(),
                organization.getSroIssuedDate(),
                organization.getAddress(),
                organization.getPhoneNumber(),
                organization.getFaxNumber(),
                employees
                );
    }

    public static Organization convertFromDto(OrganizationDto organizationDto) {
        if (organizationDto == null) {
            return null;
        }

        return new Organization(
                organizationDto.getId(),
                organizationDto.getName(),
                organizationDto.getOgrn(),
                organizationDto.getInn(),
                organizationDto.getSroNumber(),
                organizationDto.getOrganizationIssuingSro(),
                organizationDto.getSroIssuedDate(),
                organizationDto.getAddress(),
                organizationDto.getPhoneNumber(),
                organizationDto.getFaxNumber());
    }
}
