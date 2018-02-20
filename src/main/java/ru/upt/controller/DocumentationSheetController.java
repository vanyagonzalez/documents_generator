package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.DocumentationSheetConverter;
import ru.upt.dto.DocumentationSheetDto;
import ru.upt.model.DocumentationSheet;
import ru.upt.service.DocumentationSheetService;

@RestController
@RequestMapping(path = "/rest")
public class DocumentationSheetController {

    private final DocumentationSheetService documentationSheetService;

    @Autowired
    public DocumentationSheetController(DocumentationSheetService documentationSheetService) {
        this.documentationSheetService = documentationSheetService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/documentationSheet/{documentationSheetId}")
    public DocumentationSheetDto getDocumentationSheet(@PathVariable Long documentationSheetId) {
        return DocumentationSheetConverter.convertToDto(documentationSheetService.getById(documentationSheetId));
    }
}
