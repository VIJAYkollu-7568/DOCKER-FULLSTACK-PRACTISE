package com.example.demo;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.*;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
