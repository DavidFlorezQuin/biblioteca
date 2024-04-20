package com.Library.Library.Controller;

import com.Library.Library.Entity.Book;
import com.Library.Library.IService.IBookService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/book")
public class BookController extends ABaseController<Book, IBookService> {
    /**
     * Constructor for ABaseController.
     *
     * @param service    The service for the entity.
     */
    protected BookController(IBookService service) {
        super(service, "book");
    }
}
