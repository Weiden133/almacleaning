package kz.almacleaning.alma.service;

import kz.almacleaning.alma.model.Master;
import kz.almacleaning.alma.repository.MasterRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MasterService {

    private final MasterRepository repository;

    public MasterService(MasterRepository repository) {
        this.repository = repository;
    }

    public List<Master> getAll() {
        return repository.findAll();
    }

    public Master getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Получить всех доступных мастеров
    public List<Master> getAvailableMasters() {
        return repository.findByAvailableTrue();
    }

    // Получить мастеров по специализации
    public List<Master> getMastersBySpecialization(String specialization) {
        return repository.findBySpecializationAndAvailableTrue(specialization);
    }

    // Получить мастеров для конкретной услуги
    public List<Master> getMastersForService(Long serviceId) {
        return repository.findByServiceId(serviceId);
    }

    // Получить мастеров, свободных в определенное время
    public List<Master> getAvailableMasters(LocalDateTime startTime, LocalDateTime endTime) {
        return repository.findAvailableAtTime(startTime, endTime);
    }

    // Получить мастеров по рейтингу
    public List<Master> getMastersByRating() {
        return repository.findByAvailableTrueOrderByRatingDesc();
    }

    // Найти лучшего доступного мастера для услуги в определенное время
    public List<Master> findBestMastersForBooking(Long serviceId, LocalDateTime startTime, LocalDateTime endTime) {
        List<Master> availableMasters = repository.findAvailableAtTime(startTime, endTime);
        List<Master> serviceMasters = repository.findByServiceId(serviceId);
        
        // Фильтруем мастеров, которые могут выполнить услугу И свободны в это время
        return availableMasters.stream()
                .filter(serviceMasters::contains)
                .sorted((m1, m2) -> Double.compare(m2.getRating(), m1.getRating())) // сортировка по рейтингу
                .toList();
    }

    public Master create(Master master) {
        return repository.save(master);
    }

    public Master update(Master master) {
        return repository.save(master);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
