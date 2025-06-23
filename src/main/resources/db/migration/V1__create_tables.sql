ALTER TABLE master ADD COLUMN available BOOLEAN;


CREATE TABLE service_item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE master (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    master_id INTEGER,
    CONSTRAINT fk_master FOREIGN KEY (master_id) REFERENCES master(id)
);

CREATE TABLE order_service_items (
    order_id INTEGER NOT NULL,
    service_item_id INTEGER NOT NULL,
    PRIMARY KEY (order_id, service_item_id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_service_item FOREIGN KEY (service_item_id) REFERENCES service_item(id)
);
