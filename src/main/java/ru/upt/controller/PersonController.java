package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.PersonConverter;
import ru.upt.dto.BasicPersonDto;
import ru.upt.dto.PersonDto;
import ru.upt.service.PersonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class PersonController {
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllPersons")
    public List<BasicPersonDto> getAllPersons() {
        return personService.getAll().stream()
                .map(PersonConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/person/{personId}")
    public PersonDto getPerson(@PathVariable Long personId) {
        return PersonConverter.convertToDto(personService.getById(personId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/person")
    public PersonDto postPerson(@RequestBody PersonDto employeeDto) {
        return PersonConverter.convertToDto(personService.save(PersonConverter.convertFromDto(employeeDto)));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/person")
    public PersonDto putPerson(@RequestBody PersonDto employeeDto) {
        return PersonConverter.convertToDto(personService.save(PersonConverter.convertFromDto(employeeDto)));
    }
}
