drop database if exists pieShop;
create database pieShop default charset utf8mb4;
use pieShop;

create table pies (
    id int not null primary key auto_increment,
    pieName varchar(50) not null,
    aboutPie varchar(500),
    ingredients varchar (500),
    price decimal (6,2);
);

create table subscribed(
    id int not null primary key auto_increment,
    subscribedProgram varchar(20) not null,
    nameSurname varchar(50) not null,
    adress varchar(50) not null,
    telephoneNumber int(30) not null
);