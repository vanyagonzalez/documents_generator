package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.ConstructionObjectConverter;
import ru.upt.converter.OrganizationConverter;
import ru.upt.dto.BasicConstructionObjectDto;
import ru.upt.dto.BasicOrganizationDto;
import ru.upt.dto.ConstructionObjectDto;
import ru.upt.dto.OrganizationDto;
import ru.upt.service.ConstructionObjectService;
import ru.upt.service.OrganizationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class OrganizationController {
    private final OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllOrganizations")
    public List<BasicOrganizationDto> getAllOrganization() {
        return organizationService.getAll().stream()
                .map(OrganizationConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/organization/{organizationId}")
    public OrganizationDto getOrganization(@PathVariable Long organizationId) {
        return OrganizationConverter.convertToDto(organizationService.getById(organizationId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/organization")
    public OrganizationDto postOrganization(@RequestBody OrganizationDto constructionObjectDto) {
        return OrganizationConverter.convertToDto(
                organizationService.save(OrganizationConverter.convertFromDto(constructionObjectDto))
        );
    }
}
