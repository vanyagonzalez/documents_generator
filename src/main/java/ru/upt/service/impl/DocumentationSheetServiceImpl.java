package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.DocumentationSheet;
import ru.upt.model.KindOfWork;
import ru.upt.repository.DocumentationSheetCrudRepository;
import ru.upt.service.DocumentationSheetService;
import ru.upt.service.KindOfWorkService;

@Service
public class DocumentationSheetServiceImpl implements DocumentationSheetService {

    private final DocumentationSheetCrudRepository documentationSheetCrudRepository;
    private final KindOfWorkService kindOfWorkService;

    @Autowired
    public DocumentationSheetServiceImpl(DocumentationSheetCrudRepository documentationSheetCrudRepository,
                                         KindOfWorkService kindOfWorkService) {
        this.documentationSheetCrudRepository = documentationSheetCrudRepository;
        this.kindOfWorkService = kindOfWorkService;
    }

    @Override
    public DocumentationSheet getById(Long id) {
        return documentationSheetCrudRepository.findOne(id);
    }

    @Override
    public DocumentationSheet save(DocumentationSheet documentationSheet) {
        return documentationSheetCrudRepository.save(documentationSheet);
    }

    @Override
    public void delete(DocumentationSheet documentationSheet) {
        for (KindOfWork kindOfWork : documentationSheet.getKindOfWorks()) {
            kindOfWorkService.delete(kindOfWork);
        }
        documentationSheetCrudRepository.delete(documentationSheet);
    }
}
