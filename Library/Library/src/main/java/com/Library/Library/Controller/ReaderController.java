package com.Library.Library.Controller;

import com.Library.Library.Entity.Reader;
import com.Library.Library.IService.IReaderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/reader")
public class ReaderController extends ABaseController<Reader, IReaderService> {
    /**
     * Constructor for ABaseController.
     *
     * @param service    The service for the entity.
     */
    protected ReaderController(IReaderService service) {
        super(service, "Reader");
    }
}
