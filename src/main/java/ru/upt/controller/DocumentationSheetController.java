package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping(method = RequestMethod.POST, value = "/documentationSheet")
    public DocumentationSheetDto postDocumentationSheet(@RequestBody DocumentationSheetDto documentationSheetDto) {
        return DocumentationSheetConverter.convertToDto(documentationSheetService.save(DocumentationSheetConverter.convertFromDto(documentationSheetDto)));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/documentationSheet")
    public DocumentationSheetDto putDocumentationSheet(@RequestBody DocumentationSheetDto documentationSheetDto) {
        return DocumentationSheetConverter.convertToDto(documentationSheetService.save(DocumentationSheetConverter.convertFromDto(documentationSheetDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/documentationSheet")
    public Boolean deleteDocumentationSheet(@RequestBody DocumentationSheetDto documentationSheetDto) {
        documentationSheetService.delete(DocumentationSheetConverter.convertFromDto(documentationSheetDto));
        return Boolean.TRUE;
    }
}
