package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.ConfirmationConverter;
import ru.upt.dto.BasicConfirmationDto;
import ru.upt.dto.ConfirmationDto;
import ru.upt.service.ConfirmationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class ConfirmationController {
    private final ConfirmationService confirmationService;

    @Autowired
    public ConfirmationController(ConfirmationService confirmationService) {
        this.confirmationService = confirmationService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllConfirmations")
    public List<BasicConfirmationDto> getConfirmations() {
        return confirmationService.getAll().stream()
                .map(ConfirmationConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/confirmation/{confirmationId}")
    public ConfirmationDto getOrganization(@PathVariable Long confirmationId) {
        return ConfirmationConverter.convertToDto(confirmationService.getById(confirmationId));
    }
}
