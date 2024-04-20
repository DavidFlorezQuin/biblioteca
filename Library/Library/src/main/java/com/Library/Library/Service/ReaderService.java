package com.Library.Library.Service;

import com.Library.Library.Entity.Reader;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IRepository.IPersonRepository;
import com.Library.Library.IRepository.IReaderRepository;
import com.Library.Library.IService.IReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReaderService extends ABaseService<Reader> implements IReaderService {

    @Autowired
    private IReaderRepository repository;

    @Override
    protected IBaseRepository<Reader, Long> getRepository() {
        return repository;
    }
}
