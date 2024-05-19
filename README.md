# API de Productos - Backend

Este proyecto es una API construida con TypeScript, NestJS, MySQL, Typeorm y JWT para la gestión de productos.

## Instrucciones para levantar el backend

1. **Configuración de las credenciales de la base de datos:**
- En la ruta raíz del proyecto, crea un archivo llamado `.env` donde colocarás las credenciales de tu base de datos. El contenido del archivo `.env` debe ser similar a esto:

    - DATABASE_HOST=localhost
    - DATABASE_PORT=3306
    - DATABASE_USERNAME=root
    - DATABASE_PASSWORD=mypassword
    - DATABASE_NAME=mydbname

1. **Instalación de dependencias:**
- Asegúrate de tener Node.js instalado en tu sistema y usar la version indicada en el archivo .nvmrc
- En la raíz del proyecto, instala las dependencias ejecutando: npm install



2. **Instalación de NestJS:**
- Instala NestJS globalmente en tu sistema ejecutando el siguiente comando: npm install -g @nestjs/cli



3. **Levantar la API:**
- Una vez instaladas las dependencias y NestJS, puedes iniciar el backend ejecutando: npm run start:dev

- La API se levantará en el puerto 3001, puedes validar en [http://localhost:3001](http://localhost:3001) donde aparecerá un json con un mensaje de "Token no proporcionado"
