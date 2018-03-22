package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.CertificateConverter;
import ru.upt.dto.BasicCertificateDto;
import ru.upt.dto.CertificateDto;
import ru.upt.service.CertificateService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class CertificateController {
    private final CertificateService certificateService;

    @Autowired
    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllCertificates")
    public List<BasicCertificateDto> getCertificates() {
        return certificateService.getAll().stream()
                .map(CertificateConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/certificate/{certificateId}")
    public CertificateDto getOrganization(@PathVariable Long certificateId) {
        return CertificateConverter.convertToDto(certificateService.getById(certificateId));
    }
}
