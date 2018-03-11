package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.model.Employee;

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
}
