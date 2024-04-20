package com.Library.Library.IRepository;

import com.Library.Library.Entity.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface IPersonRepository extends IBaseRepository<Person, Long> {
}
