package ru.upt.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static ru.upt.test.WebSocketConfiguration.MESSAGE_PREFIX;

@Component
@RepositoryEventHandler(EmployeeTmp.class)
public class EventHandler {

    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;

    @Autowired
    public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newEmployee(EmployeeTmp employeeTmp) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newEmployee", getPath(employeeTmp));
    }

    @HandleAfterDelete
    public void deleteEmployee(EmployeeTmp employeeTmp) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deleteEmployee", getPath(employeeTmp));
    }

    @HandleAfterSave
    public void updateEmployee(EmployeeTmp employeeTmp) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/updateEmployee", getPath(employeeTmp));
    }

    /**
     * Take an {@link EmployeeTmp} and get the URI using Spring Data REST's {@link EntityLinks}.
     *
     * @param employeeTmp
     */
    private String getPath(EmployeeTmp employeeTmp) {
        return this.entityLinks.linkForSingleResource(employeeTmp.getClass(),
                employeeTmp.getId()).toUri().getPath();
    }

}
