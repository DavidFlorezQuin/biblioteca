package com.Library.Library.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "autor")
public class Autor extends ABaseEntity {

    @Column(name = "name", length = 50, nullable = false)
    private String name;
    @Column(name = "age", length = 50, nullable = false)
    private String age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
