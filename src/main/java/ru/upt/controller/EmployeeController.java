package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.EmployeeConverter;
import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.EmployeeDto;
import ru.upt.service.EmployeeService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllEmployees")
    public List<BasicEmployeeDto> getAllConstructionObjects() {
        return employeeService.getAll().stream()
                .map(EmployeeConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/employee/{employeeId}")
    public EmployeeDto getEmployee(@PathVariable Long employeeId) {
        return EmployeeConverter.convertToDto(employeeService.getById(employeeId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/employee")
    public EmployeeDto postEmployee(@RequestBody EmployeeDto employeeDto) {
        return EmployeeConverter.convertToDto(employeeService.save(EmployeeConverter.convertFromDto(employeeDto)));
    }
}
