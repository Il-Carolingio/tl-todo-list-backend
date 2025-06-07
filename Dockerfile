# Usa la imagen oficial de MySQL
FROM mysql:latest

# Variables de entorno (configuración inicial)
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=todouser
ENV MYSQL_DATABASE=todo_db    
ENV MYSQL_PASSWORD=todopassword

# Puerto expuesto (MySQL usa 3306 por defecto)
EXPOSE 3306
# Instala Node.js y el health check
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY dockerHttpPort.js /healthcheck/
WORKDIR /healthcheck
RUN npm init -y && npm install express