package com.Library.Library.Entity;


import jakarta.persistence.*;
import org.apache.catalina.User;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "loan")
public class Loan extends ABaseEntity{

    @ManyToMany
    @JoinTable(name = "loan_book", joinColumns = @JoinColumn(name = "loan_id"), inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> books;

    @ManyToOne
    @JoinColumn(name = "reader_id", nullable = false)
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "bibliotecary_id", nullable = false)
    private Bibliotecary bibliotecary;

    @Column(name = "loan_date", nullable = false)
    private LocalDate loanDate;

    @Column(name = "return_date")
    private LocalDate returnDate;


    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public Reader getReader() {
        return reader;
    }

    public void setReader(Reader reader) {
        this.reader = reader;
    }

    public Bibliotecary getBibliotecary() {
        return bibliotecary;
    }

    public void setBibliotecary(Bibliotecary bibliotecary) {
        this.bibliotecary = bibliotecary;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
}
