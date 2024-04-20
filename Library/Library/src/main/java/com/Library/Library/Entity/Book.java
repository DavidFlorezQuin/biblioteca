package com.Library.Library.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "book")
public class Book extends ABaseEntity {
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "pages", length = 50, nullable = false)
    private String pages;

    @Column(name = "stock", length = 50, nullable = false)
    private Integer stock;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private Autor autor;


    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPages() {
        return pages;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }
}
