package com.example.demo;


import com.example.demo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // adjust to your React port if needed
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Get all items
    @GetMapping
    public List<Inventory> getAllItems() {
        return inventoryRepository.findAll();
    }

    // Add new item
    @PostMapping
    public Inventory addItem(@RequestBody Inventory item) {
        return inventoryRepository.save(item);
    }

    // Get single item
    @GetMapping("/{id}")
    public Inventory getItem(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    // Update item
    @PutMapping("/{id}")
    public Inventory updateItem(@PathVariable Long id, @RequestBody Inventory updatedItem) {
        return inventoryRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setCategory(updatedItem.getCategory());
                    item.setQuantity(updatedItem.getQuantity());
                    item.setDescription(updatedItem.getDescription());
                    return inventoryRepository.save(item);
                })
                .orElse(null);
    }

    // Delete item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        inventoryRepository.deleteById(id);
    }
}
