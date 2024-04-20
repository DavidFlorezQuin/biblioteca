package com.Library.Library.IRepository;

import com.Library.Library.Dto.LoanDto;
import com.Library.Library.Dto.LoanPersonDto;
import com.Library.Library.Entity.Loan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ILoanRepository extends IBaseRepository<Loan, Long> {

    @Query(value = " SELECT  "
            + " lo.reader_id as PersonId,	"
            + " pe.first_name as name, "
            + " COUNT(*) AS prestamos, "
            + " re.outstanding_fines multas "
            + "	FROM  "
            + "	loan lo "
            + "	INNER JOIN  "
            + " reader re "
            + " ON lo.reader_id = re.id "
            + " INNER JOIN "
            + " person pe "
            + " ON re.person_id = pe.id GROUP BY name", nativeQuery = true)
    List<LoanDto> getLoan();

    @Query(value = " SELECT "
            + " lo.id as id,	"
            + " lo.reader_id as PersonId,	"
            + " bo.name as BookName,	"
            + " pe.first_name as Biblio, "
            + " lo.return_date as ReturnDay, "
            + " lo.state as state "
            + " FROM "
            + "	loan lo "
            + " INNER JOIN bibliotecary bi ON lo.bibliotecary_id = bi.id "
            + " INNER JOIN person pe ON bi.person_id = pe.id "
            + " INNER JOIN loan_book lb ON lb.loan_id = lo.id  "
            + " INNER JOIN book bo ON lb.book_id = bo.id  "
            + " WHERE lo.reader_id = :idUser", nativeQuery = true)
    List<LoanPersonDto> getLoanPerson(Long idUser);

}
