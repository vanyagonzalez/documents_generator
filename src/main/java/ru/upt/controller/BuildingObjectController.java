package ru.upt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.upt.model.BuildingObject;
import ru.upt.service.BuildingObjectService;

import java.util.List;

@Controller
public class BuildingObjectController {
    private final BuildingObjectService buildingObjectService;

    @Autowired
    public BuildingObjectController(BuildingObjectService buildingObjectService) {
        this.buildingObjectService = buildingObjectService;
    }

    @RequestMapping("/buildingObjects")
    @ResponseBody
    public List<BuildingObject> getBuildingObjects() {
        return buildingObjectService.getBuildingObjects();
    }
}
