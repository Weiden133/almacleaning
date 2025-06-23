package kz.almacleaning.alma.service;

import kz.almacleaning.alma.model.Order;
import kz.almacleaning.alma.model.OrderStatus;
import kz.almacleaning.alma.model.Master;
import kz.almacleaning.alma.model.ServiceItem;
import kz.almacleaning.alma.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final MasterService masterService;
    private final ServiceItemService serviceItemService;

    public OrderService(OrderRepository repository, 
                       MasterService masterService,
                       ServiceItemService serviceItemService) {
        this.repository = repository;
        this.masterService = masterService;
        this.serviceItemService = serviceItemService;
    }

    public List<Order> getAll() {
        return repository.findAll();
    }

    public Order getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Создать новый заказ
    public Order createOrder(Order order) {
        // Валидация
        if (order.getService() == null) {
            throw new IllegalArgumentException("Услуга должна быть указана");
        }
        
        // Рассчитываем общую стоимость
        ServiceItem service = serviceItemService.getById(order.getService().getId());
        order.setTotalPrice(service.getPrice() * order.getQuantity());
        
        // Если мастер не указан, находим лучшего доступного
        if (order.getMaster() == null) {
            Master bestMaster = findBestAvailableMaster(order.getService().getId(), order.getScheduledTime());
            order.setMaster(bestMaster);
        } else {
            // Проверяем доступность указанного мастера
            if (!isMasterAvailable(Long.valueOf(order.getMaster().getId()), order.getScheduledTime(), service.getDuration())) {
                throw new IllegalArgumentException("Выбранный мастер недоступен в указанное время");
            }
        }
        
        order.setStatus(OrderStatus.NEW);
        return repository.save(order);
    }

    // Найти лучшего доступного мастера
    private Master findBestAvailableMaster(Long serviceId, LocalDateTime scheduledTime) {
        ServiceItem service = serviceItemService.getById(serviceId);
        LocalDateTime endTime = scheduledTime.plusMinutes(service.getDuration());
        
        List<Master> availableMasters = masterService.findBestMastersForBooking(serviceId, scheduledTime, endTime);
        
        if (availableMasters.isEmpty()) {
            throw new IllegalArgumentException("Нет доступных мастеров на выбранное время");
        }
        
        return availableMasters.get(0); // Лучший по рейтингу
    }

    // Проверить доступность мастера
    public boolean isMasterAvailable(Long masterId, LocalDateTime startTime, Integer durationMinutes) {
        LocalDateTime endTime = startTime.plusMinutes(durationMinutes);
        Long conflictingOrders = repository.countMasterOrdersInTimeRange(masterId, startTime, endTime);
        return conflictingOrders == 0;
    }

    // Подтвердить заказ
    public Order confirmOrder(Long orderId) {
        Order order = getById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Заказ не найден");
        }
        
        order.setStatus(OrderStatus.CONFIRMED);
        return repository.save(order);
    }

    // Начать выполнение заказа
    public Order startOrder(Long orderId) {
        Order order = getById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Заказ не найден");
        }
        
        order.setStatus(OrderStatus.IN_PROGRESS);
        return repository.save(order);
    }

    // Завершить заказ
    public Order completeOrder(Long orderId) {
        Order order = getById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Заказ не найден");
        }
        
        order.setStatus(OrderStatus.COMPLETED);
        // completedAt устанавливается автоматически в @PreUpdate
        
        // Обновляем статистику мастера
        Master master = order.getMaster();
        if (master != null) {
            master.setCompletedOrders(master.getCompletedOrders() + 1);
            masterService.update(master);
        }
        
        return repository.save(order);
    }

    // Отменить заказ
    public Order cancelOrder(Long orderId) {
        Order order = getById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Заказ не найден");
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        return repository.save(order);
    }

    // Получить заказы клиента по телефону
    public List<Order> getCustomerOrders(String phone) {
        return repository.findByPhoneOrderByCreatedAtDesc(phone);
    }

    // Получить заказы мастера
    public List<Order> getMasterOrders(Long masterId) {
        return repository.findByMasterIdOrderByScheduledTimeAsc(masterId);
    }

    // Получить новые заказы (для уведомлений)
    public List<Order> getNewOrders() {
        return repository.findByStatus(OrderStatus.NEW);
    }

    // Получить заказы за сегодня
    public List<Order> getTodayOrders() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        return repository.findByScheduledTimeBetweenOrderByScheduledTimeAsc(startOfDay, endOfDay);
    }
}
