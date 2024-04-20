package com.Library.Library.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bibliotecary")
public class Bibliotecary extends ABaseEntity{
    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    private String password;
    @Column(name = "salary", nullable = false)
    private String salary;

    @Column(name = "work_schedule", length = 100, nullable = false)
    private String workSchedule;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getWorkSchedule() {
        return workSchedule;
    }

    public void setWorkSchedule(String workSchedule) {
        this.workSchedule = workSchedule;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
