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
    stock int,
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
