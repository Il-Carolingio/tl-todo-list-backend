# Usa la imagen oficial de MySQL
FROM mysql:latest

# Variables de entorno (configuración inicial)
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=usuario_prueba
ENV MYSQL_DATABASE=todo_db    
ENV MYSQL_PASSWORD=todopassword

# Puerto expuesto (MySQL usa 3306 por defecto)
EXPOSE 3306

# Opcional: Copia scripts SQL para inicializar la DB
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/docker