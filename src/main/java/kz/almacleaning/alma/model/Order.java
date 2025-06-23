package kz.almacleaning.alma.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Информация о клиенте
    private String customerName;
    private String phone;
    private String address;
    private String email; // Опционально для уведомлений

    // Связанные сущности
    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceItem service;

    @ManyToOne
    @JoinColumn(name = "master_id")
    private Master master;

    // Детали заказа
    @Builder.Default
    private Integer quantity = 1;           // Количество услуг
    private Integer totalPrice;             // Общая стоимость
    private String notes;                   // Дополнительные заметки от клиента

    // Временные метки
    private LocalDateTime createdAt;        // Когда создан заказ
    private LocalDateTime scheduledTime;    // Запланированное время выполнения
    private LocalDateTime completedAt;      // Когда выполнен

    // Статус заказа
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.NEW;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (totalPrice == null && service != null) {
            totalPrice = service.getPrice() * quantity;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        if (status == OrderStatus.COMPLETED && completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }
}
