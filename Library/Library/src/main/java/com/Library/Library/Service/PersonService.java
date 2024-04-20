package com.Library.Library.Service;

import com.Library.Library.Dto.LoanDto;
import com.Library.Library.Entity.Person;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IRepository.IPersonRepository;
import com.Library.Library.IService.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersonService extends ABaseService<Person> implements IPersonService {

    @Autowired
    private IPersonRepository repository;
    @Override
    protected IBaseRepository<Person, Long> getRepository() {
        return repository;
    }


}
