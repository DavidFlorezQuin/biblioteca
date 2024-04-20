package com.Library.Library.Controller;


import com.Library.Library.Entity.Bibliotecary;
import com.Library.Library.IService.IBibliotecaryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/bibliotecary")
public class BibliotecaryController extends ABaseController<Bibliotecary, IBibliotecaryService> {
    /**
     * Constructor for ABaseController.
     *
     * @param service    The service for the entity.
     */
    protected BibliotecaryController(IBibliotecaryService service) {
        super(service, "Bibliotecary");
    }
}
