package ru.upt.config;

import ru.upt.model.BuildingObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppDataSource {
    private static Map<Long, BuildingObject> buildingObjectMap = new HashMap<Long, BuildingObject>();
    static {
        BuildingObject bo1 = new BuildingObject("Объект строительства 1", null);
        buildingObjectMap.put(bo1.getBuildingObjectId(), bo1);

        BuildingObject bo2 = new BuildingObject("Объект строительства 2", null);
        buildingObjectMap.put(bo2.getBuildingObjectId(), bo2);

        BuildingObject bo3 = new BuildingObject("Объект строительства 3", null);
        buildingObjectMap.put(bo3.getBuildingObjectId(), bo3);
    }

    public static List<BuildingObject> getBuildingObjects() {
        return new ArrayList<BuildingObject>(buildingObjectMap.values());
    }

    public static BuildingObject getBuildingObjectsById(Integer id) {
        return buildingObjectMap.get(id);
    }
}
