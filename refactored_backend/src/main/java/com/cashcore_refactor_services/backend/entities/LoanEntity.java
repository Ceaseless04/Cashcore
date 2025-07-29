package com.cashcore_refactor_services.backend.entities;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LoanID;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private CustomUserEntity user;

    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal principalAmount;

}
