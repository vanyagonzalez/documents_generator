package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.EmployeeDto;
import ru.upt.model.Employee;

public class EmployeeConverter {
    public static BasicEmployeeDto convertToBasicDto(Employee employee) {
        return new BasicEmployeeDto(
                employee.getId(),
                employee.getPerson() != null ? PersonConverter.convertToBasicDto(employee.getPerson()) : null,
                OrganizationConverter.convertToBasicDto(employee.getOrganization()),
                employee.getPosition()
        );
    }

    public static Employee convertFromBasicDto(BasicEmployeeDto basicEmployeeDto) {
        if (basicEmployeeDto == null || basicEmployeeDto.getId() == null) {
            return null;
        }
        return new Employee(
                basicEmployeeDto.getId(),
                basicEmployeeDto.getPerson() != null ? PersonConverter.convertFromBasicDto(basicEmployeeDto.getPerson()) : null,
                OrganizationConverter.convertFromBasicDto(basicEmployeeDto.getOrganization()),
                basicEmployeeDto.getPosition()
        );
    }

    public static EmployeeDto convertToDto(Employee employee) {
        if (employee == null) {
            return null;
        }

        return new EmployeeDto(
                employee.getId(),
                employee.getPerson() != null ? PersonConverter.convertToBasicDto(employee.getPerson()) : null,
                OrganizationConverter.convertToBasicDto(employee.getOrganization()),
                employee.getPosition(),
                employee.getOrderNumber(),
                employee.getOrderDate()
        );
    }

    public static Employee convertFromDto(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }

        return new Employee(
                employeeDto.getId(),
                employeeDto.getPerson() != null ? PersonConverter.convertFromBasicDto(employeeDto.getPerson()) : null,
                OrganizationConverter.convertFromBasicDto(employeeDto.getOrganization()),
                employeeDto.getPosition(),
                employeeDto.getOrderNumber(),
                employeeDto.getOrderDate()
        );
    }
}
