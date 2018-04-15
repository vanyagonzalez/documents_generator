package ru.upt.service;

import org.docx4j.openpackaging.exceptions.Docx4JException;
import ru.upt.dto.DocumentGenerationResult;
import ru.upt.model.KindOfWork;

import java.io.File;
import java.io.IOException;

public interface KindOfWorkService {
    KindOfWork getById(Long id);
    KindOfWork save(KindOfWork kindOfWork);
    void delete(KindOfWork kindOfWork);
    DocumentGenerationResult generateAosr1Document(Long id) throws IOException, Docx4JException;
}
