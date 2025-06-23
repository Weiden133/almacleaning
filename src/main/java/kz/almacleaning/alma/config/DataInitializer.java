package kz.almacleaning.alma.config;

import kz.almacleaning.alma.model.ServiceItem;
import kz.almacleaning.alma.model.Master;
import kz.almacleaning.alma.repository.ServiceItemRepository;
import kz.almacleaning.alma.repository.MasterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ServiceItemRepository serviceRepository;
    private final MasterRepository masterRepository;

    public DataInitializer(ServiceItemRepository serviceRepository, MasterRepository masterRepository) {
        this.serviceRepository = serviceRepository;
        this.masterRepository = masterRepository;
    }

    @Override
    public void run(String... args) {
        // Создаем тестовые услуги
        if (serviceRepository.count() == 0) {
            ServiceItem service1 = serviceRepository.save(ServiceItem.builder()
                .name("Химчистка кресла")
                .price(4000)
                .duration(30)
                .category("chemical_cleaning")
                .description("Профессиональная химчистка кресла")
                .active(true)
                .build());

            ServiceItem service2 = serviceRepository.save(ServiceItem.builder()
                .name("Химчистка дивана двухместного")
                .price(10000)
                .duration(90)
                .category("chemical_cleaning")
                .description("Глубокая химчистка двухместного дивана")
                .active(true)
                .build());

            ServiceItem service3 = serviceRepository.save(ServiceItem.builder()
                .name("Генеральная уборка")
                .price(8500)
                .duration(120)
                .category("general_cleaning")
                .description("Полная генеральная уборка")
                .active(true)
                .build());

            ServiceItem service4 = serviceRepository.save(ServiceItem.builder()
                .name("Химчистка ковров")
                .price(6000)
                .duration(60)
                .category("chemical_cleaning")
                .description("Профессиональная химчистка ковров")
                .active(true)
                .build());

            // Создаем тестовых мастеров
            if (masterRepository.count() == 0) {
                masterRepository.save(Master.builder()
                    .name("Иван Петров")
                    .phone("+7 777 123-45-67")
                    .specialization("Химчистка")
                    .experience(5)
                    .rating(4.8)
                    .available(true)
                    .services(new HashSet<>(Set.of(service1, service2)))
                    .build());

                masterRepository.save(Master.builder()
                    .name("Анна Сидорова")
                    .phone("+7 777 987-65-43")
                    .specialization("Уборка")
                    .experience(3)
                    .rating(4.6)
                    .available(true)
                    .services(new HashSet<>(Set.of(service3)))
                    .build());

                masterRepository.save(Master.builder()
                    .name("Сергей Козлов")
                    .phone("+7 777 555-12-34")
                    .specialization("Химчистка ковров")
                    .experience(7)
                    .rating(4.9)
                    .available(true)
                    .services(new HashSet<>(Set.of(service4)))
                    .build());
            }
        }
    }
} 