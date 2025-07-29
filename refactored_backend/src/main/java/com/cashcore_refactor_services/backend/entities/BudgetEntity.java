package com.cashcore_refactor_services.backend.entities;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BudgetEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long budgetID;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private CustomUserEntity user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal spentAmount = BigDecimal.ZERO;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void updatedAt() {
        this.updatedAt = LocalDateTime.now();
    }

}
