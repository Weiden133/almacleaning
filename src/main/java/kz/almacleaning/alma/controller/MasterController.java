package kz.almacleaning.alma.controller;

import kz.almacleaning.alma.model.Master;
import kz.almacleaning.alma.service.MasterService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/masters")
public class MasterController {

    private final MasterService service;

    public MasterController(MasterService service) {
        this.service = service;
    }

    // Получить всех мастеров
    @GetMapping
    public List<Master> getAll() {
        return service.getAll();
    }

    // Получить только доступных мастеров
    @GetMapping("/available")
    public List<Master> getAvailable() {
        return service.getAvailableMasters();
    }

    // Получить мастеров по специализации
    @GetMapping("/specialization/{specialization}")
    public List<Master> getBySpecialization(@PathVariable String specialization) {
        return service.getMastersBySpecialization(specialization);
    }

    // Получить мастеров для конкретной услуги
    @GetMapping("/service/{serviceId}")
    public List<Master> getByService(@PathVariable Long serviceId) {
        return service.getMastersForService(serviceId);
    }

    // Получить мастеров по рейтингу
    @GetMapping("/by-rating")
    public List<Master> getByRating() {
        return service.getMastersByRating();
    }

    // Найти доступных мастеров в определенное время
    @GetMapping("/available-at")
    public List<Master> getAvailableAt(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return service.getAvailableMasters(startTime, endTime);
    }

    // Найти лучших мастеров для бронирования (услуга + время)
    @GetMapping("/best-for-booking")
    public List<Master> getBestForBooking(
            @RequestParam Long serviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return service.findBestMastersForBooking(serviceId, startTime, endTime);
    }

    // Получить мастера по ID
    @GetMapping("/{id}")
    public Master getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Создать нового мастера (для админки)
    @PostMapping
    public Master create(@RequestBody Master master) {
        return service.create(master);
    }

    // Обновить мастера (для админки)
    @PutMapping("/{id}")
    public Master update(@PathVariable Long id, @RequestBody Master master) {
        master.setId(Math.toIntExact(id));
        return service.update(master);
    }
}
