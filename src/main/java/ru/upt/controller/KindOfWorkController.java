package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.upt.converter.KindOfWorkConverter;
import ru.upt.dto.KindOfWorkDto;
import ru.upt.service.KindOfWorkService;

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
}
