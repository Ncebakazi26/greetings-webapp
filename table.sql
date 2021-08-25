 create table user(
	id serial not null primary key,
	name text not null
    counter int

 );

-- create table products (
-- 	id serial not null primary key,
--     description text not null,
-- 	price decimal(10,2),
-- 	category_id int,
-- 	foreign key (category_id) references categories(id)
-- );


-- create table users (id serial primary key, name text not null, count int not null);