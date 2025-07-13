-- V2__insert_sample_data.sql

-- Добавим услуги
INSERT INTO service_item (name, description, price) VALUES
                                                        ('Химчистка дивана', 'Двухместный диван', 8000.00),
                                                        ('Химчистка ковра', 'Обычный ковёр', 5000.00),
                                                        ('Генеральная уборка', 'Квартира до 60м²', 15000.00);

-- Добавим мастеров
INSERT INTO master (name, phone_number) VALUES
                                            ('Айдос', '+77001234567'),
                                            ('Жанна', '+77009876543');

-- Добавим заказы
INSERT INTO orders (customer_name, customer_phone, status, master_id) VALUES
                                                                          ('Иван Иванов', '+77007775544', 'NEW', 1),
                                                                          ('Мария Смирнова', '+77006664433', 'IN_PROGRESS', 2);

-- Связь заказов с услугами
INSERT INTO order_service_items (order_id, service_item_id) VALUES
                                                                (1, 1),
                                                                (1, 2),
                                                                (2, 3);
