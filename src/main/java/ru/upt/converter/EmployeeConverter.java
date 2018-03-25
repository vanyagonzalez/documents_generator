package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.BasicOrganizationDto;
import ru.upt.dto.EmployeeDto;
import ru.upt.model.Employee;
import ru.upt.model.Organization;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class EmployeeConverter {
    public static BasicEmployeeDto convertToBasicDto(Employee employee) {
        return new BasicEmployeeDto(
                employee.getId(),
                employee.getSurname(),
                employee.getName(),
                employee.getMiddleName()
        );
    }

    public static Employee convertFromBasicDto(BasicEmployeeDto basicEmployeeDto) {
        if (basicEmployeeDto == null || basicEmployeeDto.getId() == null) {
            return null;
        }
        return new Employee(
                basicEmployeeDto.getId(),
                basicEmployeeDto.getSurname(),
                basicEmployeeDto.getName(),
                basicEmployeeDto.getMiddleName()
        );
    }

    public static EmployeeDto convertToDto(Employee employee) {
        if (employee == null) {
            return null;
        }
        List<BasicOrganizationDto> organizations = new ArrayList<>();
        if (employee.getOrganizations() != null && !employee.getOrganizations().isEmpty()) {
            for (Organization organization : employee.getOrganizations()) {
                organizations.add(OrganizationConverter.convertToBasicDto(organization));
            }
        }

        return new EmployeeDto(
                employee.getId(),
                employee.getSurname(),
                employee.getName(),
                employee.getMiddleName(),
                employee.getPosition(),
                employee.getOrderNumber(),
                employee.getOrderDate(),
                organizations
        );
    }

    public static Employee convertFromDto(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }

        Set<Organization> organizations = employeeDto.getOrganizations() != null && !employeeDto.getOrganizations().isEmpty() ?
                employeeDto.getOrganizations().stream().map(OrganizationConverter::convertFromBasicDto).collect(Collectors.toSet()) : null;

        return new Employee(
                employeeDto.getSurname(),
                employeeDto.getName(),
                employeeDto.getMiddleName(),
                employeeDto.getPosition(),
                employeeDto.getOrderNumber(),
                employeeDto.getOrderDate(),
                organizations
        );
    }
}
