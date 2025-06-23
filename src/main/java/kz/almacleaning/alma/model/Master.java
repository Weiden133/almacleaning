package kz.almacleaning.alma.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Master {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;              // Имя мастера
    private String phone;             // Телефон
    private String specialization;    // Специализация (например: "cleaning", "chemical_cleaning")

    @Builder.Default
    private boolean available = true; // Доступен ли мастер

    private String photoUrl;          // Фото мастера
    private String description;       // Описание/опыт мастера

    @Builder.Default
    private Integer experience = 0;   // Опыт работы в годах

    // Многие-ко-многим: мастер может выполнять несколько типов услуг
    @ManyToMany
    @JoinTable(
            name = "master_services",
            joinColumns = @JoinColumn(name = "master_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<ServiceItem> services;

    // Рейтинг мастера (опционально)
    @Builder.Default
    private Double rating = 5.0;

    @Builder.Default
    private Integer completedOrders = 0; // Количество выполненных заказов
}
