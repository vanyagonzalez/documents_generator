package ru.upt.converter;

import ru.upt.dto.BasicEmployeeDto;
import ru.upt.dto.BasicProjectDocumentDto;
import ru.upt.dto.ProjectDocumentDto;
import ru.upt.model.Employee;
import ru.upt.model.ProjectDocument;

import java.util.stream.Collectors;

public class ProjectDocumentConverter {
    public static BasicProjectDocumentDto convertToBasicDto(ProjectDocument projectDocument){
        return new BasicProjectDocumentDto(
                projectDocument.getId(),
                projectDocument.getName(),
                projectDocument.getDocumentationSheets().stream().map(DocumentationSheetConverter::convertToBasicDto).collect(Collectors.toList())
        );
    }

    public static ProjectDocument convertFromBasicDto(BasicProjectDocumentDto basicProjectDocumentDto) {
        return new ProjectDocument(basicProjectDocumentDto.getId(), basicProjectDocumentDto.getName());
    }

    public static ProjectDocumentDto convertToDto(ProjectDocument projectDocument){
        Employee author = projectDocument.getAuthor();
        Employee customerRepresentative = projectDocument.getCustomerRepresentative();
        Employee developerRepresentative = projectDocument.getDeveloperRepresentative();

        return new ProjectDocumentDto(
                projectDocument.getId(),
                projectDocument.getName(),
                projectDocument.getDocumentationSheets().stream().map(DocumentationSheetConverter::convertToBasicDto).collect(Collectors.toList()),
                projectDocument.getCode(),
                projectDocument.getPhase(),
                author != null ? EmployeeConverter.convertToBasicDto(author) : null,
                customerRepresentative != null ? EmployeeConverter.convertToBasicDto(customerRepresentative) : null,
                developerRepresentative != null ? EmployeeConverter.convertToBasicDto(developerRepresentative) : null,
                ProjectPartitionConverter.convertToBasicDto(projectDocument.getProjectPartition())
        );
    }

    public static ProjectDocument convertFromDto(ProjectDocumentDto projectDocumentDto) {
        BasicEmployeeDto author = projectDocumentDto.getAuthor();
        BasicEmployeeDto customerRepresentative = projectDocumentDto.getCustomerRepresentative();
        BasicEmployeeDto developerRepresentative = projectDocumentDto.getDeveloperRepresentative();

        return new ProjectDocument(
                projectDocumentDto.getName(),
                projectDocumentDto.getCode(),
                projectDocumentDto.getPhase(),
                author.getId() != null ? EmployeeConverter.convertFromBasicDto(author) : null,
                customerRepresentative.getId() != null ? EmployeeConverter.convertFromBasicDto(customerRepresentative) : null,
                developerRepresentative.getId() != null ? EmployeeConverter.convertFromBasicDto(developerRepresentative) : null,
                ProjectPartitionConverter.convertFromBasicDto(projectDocumentDto.getProjectPartition())
        );
    }
}
