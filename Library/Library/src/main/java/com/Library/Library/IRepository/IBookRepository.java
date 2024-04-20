package com.Library.Library.IRepository;

import com.Library.Library.Entity.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookRepository extends IBaseRepository<Book, Long> {
}
