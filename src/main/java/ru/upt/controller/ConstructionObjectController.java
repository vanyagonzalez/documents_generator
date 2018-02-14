package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.upt.model.ConstructionObject;
import ru.upt.service.ConstructionObjectService;

import java.util.List;

@Controller
public class ConstructionObjectController {
    private final ConstructionObjectService constructionObjectService;

    @Autowired
    public ConstructionObjectController(ConstructionObjectService constructionObjectService) {
        this.constructionObjectService = constructionObjectService;
    }

    @RequestMapping("/api/customConstructionObjects")
    @ResponseBody
    public List<ConstructionObject> getBuildingObjects() {
        return constructionObjectService.getConstructionObjects();
    }
}
