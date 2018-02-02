package ru.upt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectCrudRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final BuildingObjectCrudRepository repository;

    @Autowired
    public DatabaseLoader(BuildingObjectCrudRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new BuildingObject("Объект строительства 1", null));
        this.repository.save(new BuildingObject("Объект строительства 2", null));
        this.repository.save(new BuildingObject("Объект строительства 3", null));
        this.repository.save(new BuildingObject("Объект строительства 4", null));
    }
}
