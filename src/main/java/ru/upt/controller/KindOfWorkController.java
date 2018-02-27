package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.KindOfWorkConverter;
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

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/kindOfWork/{kindOfWorkId}/document/{type}"
    )
    public void generateDocument(@PathVariable Long kindOfWorkId, @PathVariable String type, HttpServletResponse response) throws IOException {

        File file = new ClassPathResource("document_templates/form_aosr1.doc").getFile();
        InputStream in = new FileInputStream(file);
        response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(in, response.getOutputStream());
    }
}
