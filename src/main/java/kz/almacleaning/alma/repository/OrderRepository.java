package kz.almacleaning.alma.repository;

import kz.almacleaning.alma.model.Order;
import kz.almacleaning.alma.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Найти заказы по статусу
    List<Order> findByStatus(OrderStatus status);
    
    // Найти заказы клиента по телефону
    List<Order> findByPhoneOrderByCreatedAtDesc(String phone);
    
    // Найти заказы мастера
    List<Order> findByMasterIdOrderByScheduledTimeAsc(Long masterId);
    
    // Найти заказы мастера по статусу
    List<Order> findByMasterIdAndStatus(Long masterId, OrderStatus status);
    
    // Найти заказы за период
    List<Order> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
    
    // Найти заказы, запланированные на определенную дату
    List<Order> findByScheduledTimeBetweenOrderByScheduledTimeAsc(LocalDateTime start, LocalDateTime end);
    
    // Проверить, занят ли мастер в определенное время
    @Query("SELECT COUNT(o) FROM Order o WHERE o.master.id = :masterId " +
           "AND o.status IN ('CONFIRMED', 'IN_PROGRESS') " +
           "AND o.scheduledTime BETWEEN :startTime AND :endTime")
    Long countMasterOrdersInTimeRange(@Param("masterId") Long masterId,
                                     @Param("startTime") LocalDateTime startTime,
                                     @Param("endTime") LocalDateTime endTime);
    
    // Получить статистику заказов за период
    @Query("SELECT o.status, COUNT(o) FROM Order o WHERE o.createdAt BETWEEN :start AND :end GROUP BY o.status")
    List<Object[]> getOrderStatistics(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    // Найти новые заказы для уведомлений
    List<Order> findByStatusAndCreatedAtAfter(OrderStatus status, LocalDateTime since);
    
    // Найти заказы определенной услуги
    List<Order> findByServiceIdOrderByCreatedAtDesc(Long serviceId);
}
