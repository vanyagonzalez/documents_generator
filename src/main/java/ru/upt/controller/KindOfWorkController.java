package ru.upt.controller;

import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.KindOfWorkConverter;
import ru.upt.dto.DocumentGenerationResult;
import ru.upt.dto.KindOfWorkDto;
import ru.upt.service.KindOfWorkService;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping(path = "/rest")
public class KindOfWorkController {
    private final KindOfWorkService kindOfWorkService;

    @Autowired
    public KindOfWorkController(KindOfWorkService kindOfWorkService) {
        this.kindOfWorkService = kindOfWorkService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/kindOfWork/{kindOfWorkId}")
    public KindOfWorkDto getKindOfWork(@PathVariable Long kindOfWorkId) {
        return KindOfWorkConverter.convertToDto(kindOfWorkService.getById(kindOfWorkId));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/kindOfWork")
    public KindOfWorkDto postKindOfWork(@RequestBody KindOfWorkDto kindOfWorkDto) {
        return KindOfWorkConverter.convertToDto(kindOfWorkService.save(KindOfWorkConverter.convertFromDto(kindOfWorkDto)));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/kindOfWork")
    public KindOfWorkDto putKindOfWork(@RequestBody KindOfWorkDto kindOfWorkDto) {
        return KindOfWorkConverter.convertToDto(kindOfWorkService.save(KindOfWorkConverter.convertFromDto(kindOfWorkDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/kindOfWork")
    public Boolean deleteKindOfWork(@RequestBody KindOfWorkDto kindOfWorkDto) {
        kindOfWorkService.delete(KindOfWorkConverter.convertFromDto(kindOfWorkDto));
        return Boolean.TRUE;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/kindOfWork/{kindOfWorkId}/document/{type}"
    )
    public void generateDocument(@PathVariable Long kindOfWorkId, @PathVariable String type, HttpServletResponse response) throws IOException, Docx4JException {

        DocumentGenerationResult generationResult = kindOfWorkService.generateAosr1Document(kindOfWorkId);
        InputStream in = new FileInputStream(generationResult.getTmpFile());
        response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        response.setHeader("Content-Disposition", "attachment; filename=" + generationResult.getFileName());
        response.setHeader("Content-Length", String.valueOf(generationResult.getTmpFile().length()));
        FileCopyUtils.copy(in, response.getOutputStream());
        in.close();
    }
}
