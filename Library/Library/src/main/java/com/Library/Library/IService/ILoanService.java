package com.Library.Library.IService;

import com.Library.Library.Dto.LoanDto;
import com.Library.Library.Dto.LoanPersonDto;
import com.Library.Library.Entity.Loan;

import java.util.List;

public interface ILoanService extends IBaseService<Loan> {

    public void RestBook(Long id) throws Exception;

    List<LoanDto> getLoan();

    List<LoanPersonDto> getLoanPerson(Long id);


}
