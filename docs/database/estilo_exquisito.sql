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

insert into Productos(nombre,descripcion,precio,imagen_url) values('Blusa de encaje','Blusa de encaje con cuello redondo y manga corta',250.00,'https://www.google.com');
insert into Productos(nombre,descripcion,precio,imagen_url) values('Blusa de tirantes','Blusa de tirantes con cuello en V y estampado de flores',200.00,'https://www.google.com');
insert into Productos(nombre,descripcion,precio,imagen_url) values('Blusa de manga larga','Blusa de manga larga con cuello redondo y estampado de rayas',300.00,'https://www.google.com');
insert into Productos(nombre,descripcion,precio,imagen_url) values('Blusa de manga corta','Blusa de manga corta con cuello en V y estampado de puntos',150.00,'https://www.google.com');
insert into Productos(nombre,descripcion,precio,imagen_url) values('Blusa de cuello alto','Blusa de cuello alto con manga larga y estampado de cuadros',350.00,'https://www.google.com');

INSERT INTO Usuarios (id_usuario, nombre, apellido, correo_electronico, telefono)
VALUES
    (UUID_TO_BIN('2da0c405-24a2-11ef-ab72-00155dbba9c2'), 'Juan', 'Perez', 'juan.perez@example.com', '1234567890'),
    (UUID_TO_BIN('3ea1c506-35b3-22ef-bc83-00266dccca1d'), 'Maria', 'Gomez', 'maria.gomez@example.com', '0987654321'),
    (UUID_TO_BIN('4fb2d607-46c4-33ef-cd94-00377eddcb2e'), 'Luis', 'Martinez', 'luis.martinez@example.com', '1122334455'),
    (UUID_TO_BIN('5ac3e708-57d5-44ef-dea5-00488feecb3f'), 'Ana', 'Lopez', 'ana.lopez@example.com', '6677889900'),
    (UUID_TO_BIN('6bd4f809-68e6-55ef-efb6-00599ffee6a6'), 'Carlos', 'Hernandez', 'carlos.hernandez@example.com', '5566778899');

INSERT INTO Ventas (id_venta, id_usuario, monto)
VALUES
    (UUID_TO_BIN('7ef5a00b-79f7-66ef-0f07-006abbffdb8d'), UUID_TO_BIN('2da0c405-24a2-11ef-ab72-00155dbba9c2'), 250.00),
    (UUID_TO_BIN('8f06b11c-8a08-77ef-1f18-007bccffee9e'), UUID_TO_BIN('3ea1c506-35b3-22ef-bc83-00266dccca1d'), 150.00),
    (UUID_TO_BIN('9f17c22d-9b19-88ef-2f29-008cddfffbaf'), UUID_TO_BIN('4fb2d607-46c4-33ef-cd94-00377eddcb2e'), 300.00),
    (UUID_TO_BIN('af28d33e-ac2a-99ef-3f3a-009dffeeecb0'), UUID_TO_BIN('5ac3e708-57d5-44ef-dea5-00488feecb3f'), 400.00),
    (UUID_TO_BIN('bf39e44f-bd3b-aaef-4f4b-00aeddffee11'), UUID_TO_BIN('6bd4f809-68e6-55ef-efb6-00599ffee6a6'), 500.00);

