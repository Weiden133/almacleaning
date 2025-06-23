package kz.almacleaning.alma.repository;

import kz.almacleaning.alma.model.Master;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MasterRepository extends JpaRepository<Master, Long> {
    
    // Найти всех доступных мастеров
    List<Master> findByAvailableTrue();
    
    // Найти мастеров по специализации и доступности
    List<Master> findBySpecializationAndAvailableTrue(String specialization);
    
    // Найти мастеров по ID услуги
    @Query("SELECT m FROM Master m JOIN m.services s WHERE s.id = :serviceId")
    List<Master> findByServiceId(@Param("serviceId") Long serviceId);
    
    // Найти доступных мастеров в определенное время
    @Query("SELECT m FROM Master m WHERE m.available = true AND m.id NOT IN " +
           "(SELECT o.master.id FROM Order o WHERE o.scheduledTime BETWEEN :startTime AND :endTime)")
    List<Master> findAvailableAtTime(@Param("startTime") LocalDateTime startTime, 
                                   @Param("endTime") LocalDateTime endTime);
    
    // Найти доступных мастеров, отсортированных по рейтингу
    List<Master> findByAvailableTrueOrderByRatingDesc();
}
