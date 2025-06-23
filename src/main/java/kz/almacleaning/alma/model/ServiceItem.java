package kz.almacleaning.alma.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;           // "Химчистка кресла"
    private Integer price;         // 4000 (в тенге)
    private Integer duration;      // 30 (в минутах)
    private String imageUrl;       // URL картинки
    private String description;    // Описание услуги
    private String category;       // "cleaning", "chemical_cleaning", "general"
    
    @Builder.Default
    private boolean active = true; // Активна ли услуга
}
