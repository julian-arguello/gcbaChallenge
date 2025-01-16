# Desafío Técnico - Desarrollador

## Objetivo 
Crear una aplicación web que permita a los usuarios gestionar tareas mediante un sistema **CRUD completo**. El back-end debe ser una **API RESTful** desarrollada en **Laravel**, y el front-end debe ser una **aplicación web dinámica** que consuma esta API.¡

## Estructura del repositorio
```

├── backend/   # Código fuente del backend en Laravel
├── frontend/  # Código fuente del frontend en React
├── README.md  # Documentación principal
```

## Tecnologías utilizadas

- **Frontend**:
  - React + Vite
- **Backend**:
  - Laravel (PHP 8.3)
  - MySQL como base de datos principal

---

## Cómo levantar el proyecto

### Requisitos previos

1. **Docker y Docker Compose** instalados en tu máquina.
2. **Node.js** (v16 o superior) para gestionar el frontend.


### Pasos para levantar el proyecto

#### 1. Clona el repositorio
```
git clone https://github.com/julian-arguello/gcbaChallenge.git
cd gcbaChallenge
```

### 2.Configuración del Backend
Ingresa a la carpeta backend.
```
cd backend
```
#### 2.1 Configura el archivo de entorno
(Ajusta las variables necesarias en el archivo ".env").
```bash
cp .env.example .env
```

#### 2.2 Instala las dependencias de Composer
```bash
composer install
```

#### 2.3 Levanta los contenedores con Laravel Sail
Asegúrate de tener Docker Desktop corriendo.
```bash
./vendor/bin/sail up -d
```

#### 2.4 Ejecuta las migraciones y seeders para inicializar la base de datos
```bash
./vendor/bin/sail artisan migrate --seed
```

### 3.Configuración del Frontend
Ingresa con a la carpeta frontend (Está ubicada junto a la carpeta backend en el directorio raíz).
```
cd frontend
```
#### 3.1 Instala las dependencias

```bash
npm install
```

#### 3.2 Levanta el proyecto

```bash
npm run dev
```
   
