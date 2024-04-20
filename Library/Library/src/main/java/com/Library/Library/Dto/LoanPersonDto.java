package com.Library.Library.Dto;

import java.util.Date;

public interface LoanPersonDto extends IGenericDto{

    String getBookName();
    String getBiblio();
    Date getReturnDay();
    Long getPersonId();

}
