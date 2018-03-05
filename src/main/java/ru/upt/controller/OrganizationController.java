package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.ConstructionObjectConverter;
import ru.upt.converter.OrganizationConverter;
import ru.upt.dto.BasicConstructionObjectDto;
import ru.upt.dto.BasicOrganizationDto;
import ru.upt.dto.ConstructionObjectDto;
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

    /*@RequestMapping(method = RequestMethod.GET, value = "/organization/{organizationId}")
    public OrgaD getOrganization(@PathVariable Long organizationId) {
        return ConstructionObjectConverter.convertToDto(constructionObjectService.getById(constructionObjectId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/constructionObject")
    public ConstructionObjectDto createConstructionObject(@RequestBody ConstructionObjectDto constructionObjectDto) {
        return ConstructionObjectConverter.convertToDto(
                constructionObjectService.save(ConstructionObjectConverter.convertFromDto(constructionObjectDto))
        );
    }*/
}
