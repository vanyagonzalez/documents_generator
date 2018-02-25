package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.ProjectPartitionConverter;
import ru.upt.dto.ProjectPartitionDto;
import ru.upt.service.ProjectPartitionService;

@RestController
@RequestMapping(path = "/rest")
public class ProjectPartitionController {
    private final ProjectPartitionService projectPartitionService;

    @Autowired
    public ProjectPartitionController(ProjectPartitionService projectPartitionService) {
        this.projectPartitionService = projectPartitionService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/projectPartition/{projectPartitionId}")
    public ProjectPartitionDto getProjectPartition(@PathVariable Long projectPartitionId) {
        return ProjectPartitionConverter.convertToDto(projectPartitionService.getById(projectPartitionId));
    }
}
