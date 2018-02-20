package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.DocumentationSheet;
import ru.upt.repository.DocumentationSheetCrudRepository;
import ru.upt.service.DocumentationSheetService;

@Service
public class DocumentationSheetServiceImpl implements DocumentationSheetService {

    private final DocumentationSheetCrudRepository documentationSheetCrudRepository;

    @Autowired
    public DocumentationSheetServiceImpl(DocumentationSheetCrudRepository documentationSheetCrudRepository) {
        this.documentationSheetCrudRepository = documentationSheetCrudRepository;
    }

    @Override
    public DocumentationSheet getById(Long id) {
        return documentationSheetCrudRepository.findOne(id);
    }
}
