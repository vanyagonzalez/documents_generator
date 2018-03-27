package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.EmployeeDto;
import ru.upt.model.Employee;

public class EmployeeConverter {
    public static BasicEmployeeDto convertToBasicDto(Employee employee) {
        return new BasicEmployeeDto(
                employee.getId(),
                PersonConverter.convertToBasicDto(employee.getPerson()),
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
                PersonConverter.convertFromBasicDto(basicEmployeeDto.getPerson()),
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
                PersonConverter.convertToBasicDto(employee.getPerson()),
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
                PersonConverter.convertFromBasicDto(employeeDto.getPerson()),
                OrganizationConverter.convertFromBasicDto(employeeDto.getOrganization()),
                employeeDto.getPosition(),
                employeeDto.getOrderNumber(),
                employeeDto.getOrderDate()
        );
    }
}
