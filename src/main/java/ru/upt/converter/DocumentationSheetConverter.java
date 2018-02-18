package ru.upt.converter;

import ru.upt.dto.BasicDocumentationSheetDto;
import ru.upt.model.DocumentationSheet;

public class DocumentationSheetConverter {
    public static BasicDocumentationSheetDto convertToBasicDto(DocumentationSheet documentationSheet) {
        return new BasicDocumentationSheetDto(documentationSheet.getId(), documentationSheet.getName());
    }
}
