drop database if exists estilo_exquisito_db;
create database estilo_exquisito_db;
use estilo_exquisito_db;

create table Productos(
	id_producto int unsigned not null auto_increment,
    nombre varchar(255) not null, 
    descripcion text not null,
    precio decimal(10,2) not null,
    imagen_url varchar(255),
    fecha_agregada timestamp default (now()),
    primary key(id_producto)
);
create table Tallas(
	id_talla int unsigned not null auto_increment,
    nombre_talla varchar(10),
    primary key(id_talla)
);

create table Inventario(
	id_producto int unsigned not null,
    id_talla int unsigned not null,
    stock int unsigned,
    foreign key(id_producto) references Productos(id_producto),
    foreign key(id_talla) references Tallas(id_talla),
    primary key(id_producto,id_talla)
);

create table Usuarios(
	id_usuario binary(16) default (UUID_TO_BIN(UUID())),
    nombre varchar(32) not null,
    apellido varchar(32) not null,
    correo_electronico varchar(255) not null unique,
    telefono char(10) not null unique,
    primary key(id_usuario)
);

create table Ventas(
	id_venta binary(16) default (UUID_TO_BIN(UUID())),
    id_usuario binary(16) not null,
    monto decimal(10,2) not null,
    fecha timestamp not null default (now()),
    foreign key(id_usuario) references Usuarios(id_usuario),
    primary key(id_venta)
);

create table Detalle_venta(
	id_detalle_venta int unsigned not null auto_increment,
    id_venta binary(16)  not null,
    id_producto int unsigned not null,
    precio_unitario decimal(10,2) not null,
    cantidad int unsigned not null,
    id_talla int unsigned not null,
    foreign key(id_venta) references Ventas(id_venta),
    foreign key(id_producto) references Inventario(id_producto),
    foreign key(id_talla) references Inventario(id_talla),
    primary key(id_detalle_venta)
);

create table Pedido_apartado(
	id_pedido_apartado int unsigned not null auto_increment,
    id_usuario binary(16) not null,
    fecha_apartado timestamp not null default (now()),
    estado boolean not null,
    foreign key(id_usuario) references Usuarios(id_usuario),
    primary key(id_pedido_apartado)
);

create table Detalle_pedido_apartado(
	id_detalle_pedido_apartado int unsigned not null auto_increment,
    id_pedido_apartado int unsigned not null,
    id_producto int unsigned not null,
    id_talla int unsigned not null,
    cantidad int unsigned not null,
    foreign key(id_pedido_apartado) references Pedido_apartado(id_pedido_apartado),
    foreign key(id_producto) references Inventario(id_producto),
    foreign key(id_talla) references Inventario(id_talla),
    primary key(id_detalle_pedido_apartado)
);

create table Trabajador(
	id_trabajador int not null auto_increment,
    usuario varchar(50) not null,
    rol enum("gerente","vendedor","almacenista") not null,
    contraseña varchar(60) not null,
	nombre_completo varchar(100),
    correo_electronico varchar(255),
    primary key(id_trabajador)
);

INSERT INTO Productos (nombre, descripcion, precio, imagen_url) VALUES
('Camiseta Básica', 'Camiseta de algodón de alta calidad', 199.99, 'url_imagen_1'),
('Pantalón Deportivo', 'Pantalón cómodo para actividades físicas', 299.99, 'url_imagen_2'),
('Chaqueta Casual', 'Chaqueta para uso diario', 499.99, 'url_imagen_3'),
('Vestido de Verano', 'Vestido ligero para verano', 399.99, 'url_imagen_4'),
('Sudadera con Capucha', 'Sudadera de lana con capucha', 349.99, 'url_imagen_5');

-- Añadiendo registros a la tabla Tallas
INSERT INTO Tallas (nombre_talla) VALUES
('XS'),
('S'),
('M'),
('L'),
('XL');

-- Añadiendo registros a la tabla Inventario
INSERT INTO Inventario (id_producto, id_talla, stock) VALUES
(1, 1, 10), -- Camiseta Básica, XS
(1, 2, 15), -- Camiseta Básica, S
(1, 3, 20), -- Camiseta Básica, M
(1, 4, 15), -- Camiseta Básica, L
(1, 5, 10), -- Camiseta Básica, XL
(2, 1, 12), -- Pantalón Deportivo, XS
(2, 2, 14), -- Pantalón Deportivo, S
(2, 3, 16), -- Pantalón Deportivo, M
(2, 4, 18), -- Pantalón Deportivo, L
(2, 5, 10), -- Pantalón Deportivo, XL
(3, 1, 5),  -- Chaqueta Casual, XS
(3, 2, 10), -- Chaqueta Casual, S
(3, 3, 12), -- Chaqueta Casual, M
(3, 4, 8),  -- Chaqueta Casual, L
(3, 5, 5),  -- Chaqueta Casual, XL
(4, 1, 20), -- Vestido de Verano, XS
(4, 2, 18), -- Vestido de Verano, S
(4, 3, 16), -- Vestido de Verano, M
(4, 4, 14), -- Vestido de Verano, L
(4, 5, 10), -- Vestido de Verano, XL
(5, 1, 8),  -- Sudadera con Capucha, XS
(5, 2, 12), -- Sudadera con Capucha, S
(5, 3, 10), -- Sudadera con Capucha, M
(5, 4, 6),  -- Sudadera con Capucha, L
(5, 5, 4);  -- Sudadera con Capucha, XL

-- Añadiendo registros a la tabla Usuarios
INSERT INTO Usuarios (id_usuario, nombre, apellido, correo_electronico, telefono) VALUES
(UUID_TO_BIN('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'), 'Juan', 'Pérez', 'juan.perez@example.com', '5551234567'),
(UUID_TO_BIN('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22'), 'María', 'Gómez', 'maria.gomez@example.com', '5552345678'),
(UUID_TO_BIN('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33'), 'Carlos', 'López', 'carlos.lopez@example.com', '5553456789'),
(UUID_TO_BIN('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44'), 'Ana', 'Martínez', 'ana.martinez@example.com', '5554567890'),
(UUID_TO_BIN('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55'), 'Luis', 'Fernández', 'luis.fernandez@example.com', '5555678901');

-- Añadiendo registros a la tabla Ventas
INSERT INTO Ventas (id_venta, id_usuario, monto, fecha) VALUES
(UUID_TO_BIN('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66'), UUID_TO_BIN('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'), 399.98, '2024-06-10 10:00:00'),
(UUID_TO_BIN('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380b66'), UUID_TO_BIN('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22'), 299.99, '2024-06-11 11:00:00'),
(UUID_TO_BIN('c7eebc99-9c0b-4ef8-bb6d-6bb9bd380c77'), UUID_TO_BIN('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33'), 499.99, '2024-06-12 12:00:00'),
(UUID_TO_BIN('d8eebc99-9c0b-4ef8-bb6d-6bb9bd380d88'), UUID_TO_BIN('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44'), 349.99, '2024-06-13 13:00:00'),
(UUID_TO_BIN('e9eebc99-9c0b-4ef8-bb6d-6bb9bd380e99'), UUID_TO_BIN('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55'), 199.99, '2024-06-14 14:00:00');

-- Añadiendo registros a la tabla Detalle_venta
INSERT INTO Detalle_venta (id_venta, id_producto, precio_unitario, cantidad, id_talla) VALUES
(UUID_TO_BIN('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66'), 1, 199.99, 2, 3),
(UUID_TO_BIN('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66'), 2, 599.99, 1, 1),
(UUID_TO_BIN('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66'), 3, 99.99, 5, 4),
(UUID_TO_BIN('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380b66'), 2, 299.99, 1, 2),
(UUID_TO_BIN('c7eebc99-9c0b-4ef8-bb6d-6bb9bd380c77'), 3, 499.99, 1, 4),
(UUID_TO_BIN('d8eebc99-9c0b-4ef8-bb6d-6bb9bd380d88'), 5, 349.99, 1, 1),
(UUID_TO_BIN('e9eebc99-9c0b-4ef8-bb6d-6bb9bd380e99'), 1, 199.99, 1, 5);

-- Añadiendo registros a la tabla Pedido_apartado
INSERT INTO Pedido_apartado (id_usuario, estado) VALUES
(UUID_TO_BIN('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'), TRUE),
(UUID_TO_BIN('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22'), FALSE),
(UUID_TO_BIN('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33'), TRUE),
(UUID_TO_BIN('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44'), TRUE),
(UUID_TO_BIN('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55'), FALSE);

-- Añadiendo registros a la tabla Detalle_pedido_apartado
INSERT INTO Detalle_pedido_apartado (id_pedido_apartado, id_producto, id_talla, cantidad) VALUES
(1, 1, 2, 3),
(1, 2, 4, 1),
(2, 3, 1, 2),
(3, 4, 5, 1),
(4, 5, 3, 2),
(5, 1, 4, 1),
(5, 2, 3, 2);
