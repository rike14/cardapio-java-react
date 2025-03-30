INSERT INTO users (
    id,
    email,
    password,
    role
) VALUES (
    sha256('admin@email.com'),
    'admin@email.com',
    '$2a$10$0I7hZwxsKSETiTVdHXuovu7BdEktT5zyCnWvuSh0edho72Csyc/Zu', -- 123456
    0 -- ADMIN
),
(
    sha256('user@email.com'),
    'user@email.com',
    '$2a$10$0I7hZwxsKSETiTVdHXuovu7BdEktT5zyCnWvuSh0edho72Csyc/Zu', -- 123456
    1 -- USER
);

INSERT INTO products (
    id,
    image,
    price,
    title
) VALUES (
    1,
    'https://blog.coffeemais.com/wp-content/uploads/2021/10/como-fazer-cafe-forte-topo.jpg',
     2.00,
    'Coffee'
),
(
    2,
    'https://www.cnnbrasil.com.br/viagemegastronomia/wp-content/uploads/sites/5/2022/05/mafe-estudio-LV2p9Utbkbw-unsplash.jpg',
    20.99,
    'Hamburguer'
),
(
    3,
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7e/0a/3d/pizza-verona.jpg?w=600&h=-1&s=1',
    30.99,
    'Pizza'
);