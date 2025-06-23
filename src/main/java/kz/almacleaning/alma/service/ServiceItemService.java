package kz.almacleaning.alma.service;

import kz.almacleaning.alma.model.ServiceItem;
import kz.almacleaning.alma.repository.ServiceItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceItemService {

    private final ServiceItemRepository repository;

    public ServiceItemService(ServiceItemRepository repository) {
        this.repository = repository;
    }

    public List<ServiceItem> getAll() {
        return repository.findAll();
    }

    public ServiceItem getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<ServiceItem> getActiveServices() {
        return repository.findByActiveTrue();
    }

    public List<ServiceItem> getByCategory(String category) {
        return repository.findByCategoryAndActiveTrue(category);
    }

    public ServiceItem create(ServiceItem item) {
        return repository.save(item);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
