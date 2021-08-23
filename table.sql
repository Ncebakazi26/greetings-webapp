-- create table categories(
-- 	id serial not null primary key,
-- 	description text not null
-- );

-- create table products (
-- 	id serial not null primary key,
--     description text not null,
-- 	price decimal(10,2),
-- 	category_id int,
-- 	foreign key (category_id) references categories(id)
-- );


create table cats (id serial primary key, user_name text not null, user_count int not null);