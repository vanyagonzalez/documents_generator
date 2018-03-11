package ru.upt.converter;

import ru.upt.dto.BasicDocumentationSheetDto;
import ru.upt.dto.DocumentationSheetDto;
import ru.upt.model.DocumentationSheet;

import java.util.stream.Collectors;

public class DocumentationSheetConverter {
    public static BasicDocumentationSheetDto convertToBasicDto(DocumentationSheet documentationSheet) {
        return new BasicDocumentationSheetDto(
                documentationSheet.getId(),
                documentationSheet.getName(),
                documentationSheet.getKindOfWorks().stream().map(KindOfWorkConverter::convertToBasicDto).collect(Collectors.toList())
        );
    }

    public static DocumentationSheet convertFromBasicDto(BasicDocumentationSheetDto basicDocumentationSheetDto) {
        return new DocumentationSheet(basicDocumentationSheetDto.getId(), basicDocumentationSheetDto.getName());
    }

    public static DocumentationSheetDto convertToDto(DocumentationSheet documentationSheet) {
        return new DocumentationSheetDto(
                documentationSheet.getId(),
                documentationSheet.getName(),
                documentationSheet.getKindOfWorks().stream().map(KindOfWorkConverter::convertToBasicDto).collect(Collectors.toList()),
                documentationSheet.getNumber(),
                documentationSheet.getChange()
        );
    }

    public static DocumentationSheet convertFromDto(DocumentationSheetDto documentationSheetDto) {
        return new DocumentationSheet(
                documentationSheetDto.getName(),
                documentationSheetDto.getNumber(),
                documentationSheetDto.getChange(),
                ProjectDocumentConverter.convertFromBasicDto(documentationSheetDto.getProjectDocument())
        );
    }
}
