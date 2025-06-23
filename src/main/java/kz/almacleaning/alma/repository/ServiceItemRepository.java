package kz.almacleaning.alma.repository;

import kz.almacleaning.alma.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    
    List<ServiceItem> findByActiveTrue();
    
    List<ServiceItem> findByCategoryAndActiveTrue(String category);
    
    List<ServiceItem> findByCategory(String category);
}
