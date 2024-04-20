package com.Library.Library.Service;

import com.Library.Library.Entity.Bibliotecary;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IRepository.IBibliotecaryRepository;
import com.Library.Library.IService.IBibliotecaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BibliotecaryService extends ABaseService<Bibliotecary> implements IBibliotecaryService {

    @Autowired
    private IBibliotecaryRepository repository;
    @Override
    protected IBaseRepository<Bibliotecary, Long> getRepository() {
        return repository;
    }
}
