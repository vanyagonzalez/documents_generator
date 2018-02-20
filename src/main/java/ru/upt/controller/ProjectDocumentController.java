package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.ProjectDocumentConverter;
import ru.upt.dto.ProjectDocumentDto;
import ru.upt.service.ProjectDocumentService;

@RestController
@RequestMapping(path = "/rest")
public class ProjectDocumentController {
    private final ProjectDocumentService projectDocumentService;

    @Autowired
    public ProjectDocumentController(ProjectDocumentService projectDocumentService) {
        this.projectDocumentService = projectDocumentService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/projectDocument/{projectDocumentId}")
    public ProjectDocumentDto getProjectDocument(@PathVariable Long projectDocumentId) {
        return ProjectDocumentConverter.convertToDto(projectDocumentService.getById(projectDocumentId));
    }
}
