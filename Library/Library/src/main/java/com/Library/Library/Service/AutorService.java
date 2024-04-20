package com.Library.Library.Service;

import com.Library.Library.Entity.Autor;
import com.Library.Library.IRepository.IAutorRepository;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IService.IAutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutorService extends ABaseService<Autor> implements IAutorService {

    @Autowired
    private IAutorRepository repository;
    @Override
    protected IBaseRepository<Autor, Long> getRepository() {
        return repository;
    }
}
