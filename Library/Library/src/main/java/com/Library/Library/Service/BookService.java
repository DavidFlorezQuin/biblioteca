package com.Library.Library.Service;

import com.Library.Library.Entity.Book;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IRepository.IBookRepository;
import com.Library.Library.IService.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService extends ABaseService<Book> implements IBookService {

    @Autowired
    private IBookRepository repository;
    @Override
    protected IBaseRepository<Book, Long> getRepository() {
        return repository;
    }

}
