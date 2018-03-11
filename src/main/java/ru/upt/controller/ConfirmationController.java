package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.CertificateConverter;
import ru.upt.converter.ConfirmationConverter;
import ru.upt.dto.BasicCertificateDto;
import ru.upt.dto.BasicConfirmationDto;
import ru.upt.service.CertificateService;
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
}
