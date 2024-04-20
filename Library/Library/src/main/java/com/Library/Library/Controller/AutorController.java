package com.Library.Library.Controller;

import com.Library.Library.Entity.Autor;
import com.Library.Library.IService.IAutorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/autor")
public class AutorController extends ABaseController<Autor, IAutorService> {

    protected AutorController(IAutorService service) {
        super(service, "autor");
    }
}
