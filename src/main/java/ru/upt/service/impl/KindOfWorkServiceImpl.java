package ru.upt.service.impl;

import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import ru.upt.dto.DocumentGenerationResult;
import ru.upt.model.ConstructionObject;
import ru.upt.model.KindOfWork;
import ru.upt.repository.KindOfWorkCrudRepository;
import ru.upt.service.KindOfWorkService;
import ru.upt.utils.Docx4jUtils;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class KindOfWorkServiceImpl implements KindOfWorkService {

    private final KindOfWorkCrudRepository kindOfWorkCrudRepository;

    @Autowired
    public KindOfWorkServiceImpl(KindOfWorkCrudRepository kindOfWorkCrudRepository) {
        this.kindOfWorkCrudRepository = kindOfWorkCrudRepository;
    }

    @Override
    public KindOfWork getById(Long id) {
        return kindOfWorkCrudRepository.findOne(id);
    }

    @Override
    public KindOfWork save(KindOfWork kindOfWork) {
        return kindOfWorkCrudRepository.save(kindOfWork);
    }

    @Override
    public DocumentGenerationResult generateAosr1Document(Long id) throws IOException, Docx4JException {
        KindOfWork kindOfWork = kindOfWorkCrudRepository.findOne(id);
        ConstructionObject constrObj = kindOfWork.getDocumentationSheet().getProjectDocument().getProjectPartition().getConstructionObject();

        Map<String, String> placeholderValueMap = new HashMap<>();
        placeholderValueMap.put("${CONST_OBJ}", constrObj.getName());
        placeholderValueMap.put("${CUSTOMER}", constrObj.getCustomer().getName());
        placeholderValueMap.put("${DEVELOPER}", constrObj.getDeveloper().getName());

        File file = new ClassPathResource("document_templates/form_aosr1.docx").getFile();
        WordprocessingMLPackage template = Docx4jUtils.getTemplate(file);
        Docx4jUtils.replacePlaceholders(template, placeholderValueMap);
        File tmpFile = Docx4jUtils.writeDocxToTmpStream(template);
        return new DocumentGenerationResult(String.format("aosr1_for_work_%s.docx", kindOfWork.getId()), tmpFile);
    }
}
