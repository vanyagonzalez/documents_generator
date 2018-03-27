package ru.upt.converter;

import ru.upt.dto.*;
import ru.upt.model.Employee;
import ru.upt.model.Organization;
import ru.upt.model.Person;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class PersonConverter {
    public static BasicPersonDto convertToBasicDto(Person person) {
        return new BasicPersonDto(
                person.getId(),
                person.getSurname(),
                person.getName(),
                person.getMiddleName()
        );
    }

    public static Person convertFromBasicDto(BasicPersonDto basicPersonDto) {
        if (basicPersonDto == null || basicPersonDto.getId() == null) {
            return null;
        }
        return new Person(
                basicPersonDto.getId(),
                basicPersonDto.getSurname(),
                basicPersonDto.getName(),
                basicPersonDto.getMiddleName()
        );
    }

    public static PersonDto convertToDto(Person person) {
        if (person == null) {
            return null;
        }

        return new PersonDto(
                person.getId(),
                person.getSurname(),
                person.getName(),
                person.getMiddleName()
        );
    }

    public static Person convertFromDto(PersonDto personDto) {
        if (personDto == null) {
            return null;
        }

        return new Person(
                personDto.getId(),
                personDto.getSurname(),
                personDto.getName(),
                personDto.getMiddleName()
        );
    }
}
