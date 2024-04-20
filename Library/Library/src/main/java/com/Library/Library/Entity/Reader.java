package com.Library.Library.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reader")
public class Reader extends ABaseEntity{

    @Column(name = "type_membership", length = 50, nullable = false)
    private String typeMembership;

    @Column(name = "state_membership", length = 20, nullable = false)
    private Boolean stateMembership;


    @Column(name = "outstanding_fines", nullable = false)
    private int outstandingFines;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getTypeMembership() {
        return typeMembership;
    }

    public void setTypeMembership(String typeMembership) {
        this.typeMembership = typeMembership;
    }

    public Boolean getStateMembership() {
        return stateMembership;
    }

    public void setStateMembership(Boolean stateMembership) {
        this.stateMembership = stateMembership;
    }

    public int getOutstandingFines() {
        return outstandingFines;
    }

    public void setOutstandingFines(int outstandingFines) {
        this.outstandingFines = outstandingFines;
    }
}
