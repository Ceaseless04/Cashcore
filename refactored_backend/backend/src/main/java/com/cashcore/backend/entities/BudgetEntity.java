package com.cashcore.backend.entities;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class BudgetEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long budgetID;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private CustomUserEntity user;

    @Column(nullable = false)
    private String name;

    

}
