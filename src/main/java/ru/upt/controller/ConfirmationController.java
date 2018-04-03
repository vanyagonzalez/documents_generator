package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public ConfirmationDto getConfirmation(@PathVariable Long confirmationId) {
        return ConfirmationConverter.convertToDto(confirmationService.getById(confirmationId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/confirmation")
    public ConfirmationDto postConfirmation(@RequestBody ConfirmationDto confirmationDto) {
        return ConfirmationConverter.convertToDto(confirmationService.save(ConfirmationConverter.convertFromDto(confirmationDto)));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/confirmation")
    public ConfirmationDto putConfirmation(@RequestBody ConfirmationDto confirmationDto) {
        return ConfirmationConverter.convertToDto(confirmationService.save(ConfirmationConverter.convertFromDto(confirmationDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/confirmation")
    public Boolean deleteConfirmation(@RequestBody ConfirmationDto confirmationDto) {
        confirmationService.delete(ConfirmationConverter.convertFromDto(confirmationDto));
        return Boolean.TRUE;
    }
}
