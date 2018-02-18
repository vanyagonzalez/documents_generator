package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.upt.converter.ConstructionObjectConverter;
import ru.upt.dto.BasicConstructionObjectDto;
import ru.upt.dto.ConstructionObjectDto;
import ru.upt.service.ConstructionObjectService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/rest")
public class ConstructionObjectController {
    private final ConstructionObjectService constructionObjectService;

    @Autowired
    public ConstructionObjectController(ConstructionObjectService constructionObjectService) {
        this.constructionObjectService = constructionObjectService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/AllConstructionObjects")
    public List<BasicConstructionObjectDto> getAllConstructionObjects() {
        return constructionObjectService.getConstructionObjects().stream()
                .map(ConstructionObjectConverter::convertToBasicDto).collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/constructionObject/{constructionObjectId}")
    public ConstructionObjectDto getGonstructionObject(@PathVariable Long constructionObjectId) {
        return ConstructionObjectConverter.convertToDto(constructionObjectService.getConstructionObjectById(constructionObjectId));
    }
}
