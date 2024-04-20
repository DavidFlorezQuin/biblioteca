package com.Library.Library.Service;

import com.Library.Library.Dto.LoanDto;
import com.Library.Library.Dto.LoanPersonDto;
import com.Library.Library.Entity.Book;
import com.Library.Library.Entity.Loan;
import com.Library.Library.IRepository.IBaseRepository;
import com.Library.Library.IRepository.IBookRepository;
import com.Library.Library.IRepository.ILoanRepository;
import com.Library.Library.IService.ILoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LoanService extends ABaseService<Loan> implements ILoanService {

    @Autowired
    private IBookRepository repositoryb;
    @Autowired
    private ILoanRepository repository;
    @Override
    protected IBaseRepository<Loan, Long> getRepository() {
        return repository;
    }

    @Override
    public Loan save(Loan entity) throws Exception {
        try {
            // Verificar si el préstamo tiene libros asociados
            Set<Book> books = entity.getBooks();
            if (books == null || books.isEmpty()) {
                throw new Exception("El préstamo debe tener al menos un libro asociado");
            }

            // Restar cada libro prestado
            for (Book book : books) {
                RestBook(book.getId());
            }

            // Guardar el préstamo
            return getRepository().save(entity);
        } catch (Exception e) {
            // Captura la excepción
            throw new Exception("Error al guardar la entidad: " + e.getMessage());
        }
    }
    @Override
    public List<LoanDto> getLoan() {
        return repository.getLoan();
    }

    @Override
    public List<LoanPersonDto> getLoanPerson(Long id) {
        return repository.getLoanPerson(id);
    }

    @Override
    public void RestBook(Long id) throws Exception {

        Optional<Book> op = repositoryb.findById(id);
        if (op.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (op.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }
            Book bookUpdate = op.get();

            Integer stock = bookUpdate.getStock();
            if(stock > 0){
                bookUpdate.setStock(stock - 1);
                repositoryb.save(bookUpdate);
            }

    }
}
