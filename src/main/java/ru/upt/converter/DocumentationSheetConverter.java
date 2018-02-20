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

    public static DocumentationSheetDto convertToDto(DocumentationSheet documentationSheet) {
        return new DocumentationSheetDto(
                documentationSheet.getId(),
                documentationSheet.getName(),
                documentationSheet.getKindOfWorks().stream().map(KindOfWorkConverter::convertToBasicDto).collect(Collectors.toList())
        );
    }
}
