package ru.upt.datasource;

import ru.upt.model.BuildingObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppDataSource {
    private static Map<Integer, BuildingObject> buildingObjectMap = new HashMap<Integer, BuildingObject>();
    static {
        BuildingObject bo1 = new BuildingObject();
        bo1.setId(1);
        bo1.setName("Объект строительства 1");
        buildingObjectMap.put(bo1.getId(), bo1);

        BuildingObject bo2 = new BuildingObject();
        bo2.setId(2);
        bo2.setName("Объект строительства 2");
        buildingObjectMap.put(bo2.getId(), bo2);

        BuildingObject bo3 = new BuildingObject();
        bo3.setId(3);
        bo3.setName("Объект строительства 3");
        buildingObjectMap.put(bo3.getId(), bo3);
    }

    public static List<BuildingObject> getBuildingObjects() {
        return new ArrayList<BuildingObject>(buildingObjectMap.values());
    }

    public static BuildingObject getBuildingObjectsById(Integer id) {
        return buildingObjectMap.get(id);
    }
}
