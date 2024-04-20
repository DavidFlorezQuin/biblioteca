package com.Library.Library.IRepository;

import com.Library.Library.Entity.Autor;
import org.springframework.stereotype.Repository;

@Repository
public interface IAutorRepository extends IBaseRepository<Autor, Long> {
}
