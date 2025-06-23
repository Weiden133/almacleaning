package kz.almacleaning.alma.controller;

import kz.almacleaning.alma.model.Order;
import kz.almacleaning.alma.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // Создать новый заказ
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            Order createdOrder = service.createOrder(order);
            return ResponseEntity.ok(createdOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Получить заказ по ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        Order order = service.getById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    // Получить все заказы (для админки)
    @GetMapping
    public List<Order> getAll() {
        return service.getAll();
    }

    // Получить заказы клиента по телефону
    @GetMapping("/customer/{phone}")
    public List<Order> getCustomerOrders(@PathVariable String phone) {
        return service.getCustomerOrders(phone);
    }

    // Получить заказы мастера
    @GetMapping("/master/{masterId}")
    public List<Order> getMasterOrders(@PathVariable Long masterId) {
        return service.getMasterOrders(masterId);
    }

    // Получить новые заказы (для директора)
    @GetMapping("/new")
    public List<Order> getNewOrders() {
        return service.getNewOrders();
    }

    // Получить заказы на сегодня
    @GetMapping("/today")
    public List<Order> getTodayOrders() {
        return service.getTodayOrders();
    }

    // Подтвердить заказ
    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmOrder(@PathVariable Long id) {
        try {
            Order order = service.confirmOrder(id);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Начать выполнение заказа
    @PutMapping("/{id}/start")
    public ResponseEntity<?> startOrder(@PathVariable Long id) {
        try {
            Order order = service.startOrder(id);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Завершить заказ
    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeOrder(@PathVariable Long id) {
        try {
            Order order = service.completeOrder(id);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Отменить заказ
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        try {
            Order order = service.cancelOrder(id);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Проверить доступность мастера
    @GetMapping("/master/{masterId}/availability")
    public ResponseEntity<Boolean> checkMasterAvailability(
            @PathVariable Long masterId,
            @RequestParam String startTime,
            @RequestParam Integer duration) {
        try {
            boolean available = service.isMasterAvailable(masterId, 
                java.time.LocalDateTime.parse(startTime), duration);
            return ResponseEntity.ok(available);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Обновить заказ (для админки)
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        order.setId(id);
        // Здесь можно добавить логику обновления
        return ResponseEntity.ok(order);
    }
}
