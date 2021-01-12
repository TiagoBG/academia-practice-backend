-- mysql -h localhost -u root -p
SHOW databases; -- Nos permite visualizar las bases de datos creadas en MySQL
SHOW tables; -- Nos permite ver las tablas de la base de datos
USE academia; -- Nos permite seleccionar la base de datos a trabajar
CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'tu_contrasena'; -- Se puede crear dentro o fuera de la base de datos
SELECT USER, PASSWORD, HOST FROM USER; -- para ver los usuarios que hay en una base de datos
GRANT USAGE ON *.* TO 'santiago'@'localhost' IDENTIFIED BY 'Colombia2021';
GRANT USAGE ON *.* TO 'santiago'@'%' IDENTIFIED BY 'Colombia2021'; -- El comodin % reemplaza el localhost o 127.0.0.1

GRANT ALL PRIVILEGES ON academia.* TO 'santiago'@'localhost';

GRANT SELECT, INSERT ON academia.

DESC tipo_documento; -- Muestra la tabla en forma descriptiva