# Usa la imagen oficial de MySQL
FROM mysql:latest

# Variables de entorno (configuración inicial)
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV DB_USER=todouser
ENV DB_NAME=todo_db    
ENV DB_PASSWORD=todopassword

# Puerto expuesto (MySQL usa 3306 por defecto)
EXPOSE 3306

COPY healthcheck.py /healthcheck.py

# Inicia MySQL y el health check en paralelo
CMD sh -c "python3 /healthcheck.py & mysqld"