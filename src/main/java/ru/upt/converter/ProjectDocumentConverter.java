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
                new BasicEmployeeDto(author.getId(), author.getSurname(), author.getName(), author.getMiddleName()),
                new BasicEmployeeDto(customerRepresentative.getId(), customerRepresentative.getSurname(), customerRepresentative.getName(), customerRepresentative.getMiddleName()),
                new BasicEmployeeDto(developerRepresentative.getId(), developerRepresentative.getSurname(), developerRepresentative.getName(), developerRepresentative.getMiddleName())
        );
    }
}
