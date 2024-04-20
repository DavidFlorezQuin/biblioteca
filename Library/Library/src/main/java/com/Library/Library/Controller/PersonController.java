package com.Library.Library.Controller;

import com.Library.Library.Entity.Person;
import com.Library.Library.IService.IPersonService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/person")
public class PersonController extends ABaseController<Person, IPersonService> {
    /**
     * Constructor for ABaseController.
     *
     * @param service    The service for the entity.
     */
    protected PersonController(IPersonService service) {
        super(service, "Person");
    }
}
