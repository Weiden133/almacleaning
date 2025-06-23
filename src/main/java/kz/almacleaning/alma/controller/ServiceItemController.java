package kz.almacleaning.alma.controller;

import kz.almacleaning.alma.model.ServiceItem;
import kz.almacleaning.alma.service.ServiceItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceItemController {

    private final ServiceItemService service;

    public ServiceItemController(ServiceItemService service) {
        this.service = service;
    }

    // Получить все услуги
    @GetMapping
    public List<ServiceItem> getAll() {
        return service.getAll();
    }

    // Получить только активные услуги (для клиентов)
    @GetMapping("/active")
    public List<ServiceItem> getActive() {
        return service.getActiveServices();
    }

    // Получить услуги по категории
    @GetMapping("/category/{category}")
    public List<ServiceItem> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    // Получить услугу по ID
    @GetMapping("/{id}")
    public ServiceItem getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Создать новую услугу (для админки)
    @PostMapping
    public ServiceItem create(@RequestBody ServiceItem serviceItem) {
        return service.create(serviceItem);
    }
}
