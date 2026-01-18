# Procrastinant - Aplicación de Gestión de Tareas

Una aplicación web moderna de to-do list desarrollada con React y Vite para ayudarte a vencer la procrastinación.

## 🚀 Tecnologías Principales

- **React** 18.3.1
- **Vite** 6.0.5
- **React Router DOM** 6.30.3
- **Tailwind CSS** 4.1.18
- **Zustand** 5.0.10 (gestión de estado)
- **React Hook Form** 7.71.1
- **Axios** 1.13.2

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.20.5 o superior
- **npm** versión 10.x o superior

Verifica tus versiones instaladas:

```bash
node --version
npm --version
```

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd procrastinant-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL de tu API:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en [http://localhost:5173](http://localhost:5173)

### Build de Producción

```bash
npm run build
```

Compila la aplicación para producción en la carpeta `dist`

### Previsualización

```bash
npm run preview
```

Previsualiza el build de producción localmente

### Linting

```bash
npm run lint
```

Verifica el código con ESLint (Standard Style)

### Testing

```bash
npm run test
```

Ejecuta la suite de tests con Vitest

## 📁 Estructura del Proyecto

```
procrastinant-app/
├── public/               # Archivos estáticos
├── src/
│   ├── features/         # Features organizadas por funcionalidad
│   │   ├── autenticacion/
│   │   ├── dashboard/
│   │   └── configuracion-usuario/
│   ├── layouts/          # Layouts compartidos
│   ├── shared/           # Componentes compartidos
│   ├── routes/           # Sistema de rutas
│   ├── stores/           # Stores de Zustand
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios de API
│   ├── config/           # Configuración (axios, constantes)
│   ├── assets/           # Recursos estáticos
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
├── .env                  # Variables de entorno (no versionado)
├── .env.example          # Ejemplo de variables de entorno
├── package.json          # Dependencias del proyecto
├── tailwind.config.js    # Configuración de Tailwind
├── vite.config.js        # Configuración de Vite
└── README.md             # Este archivo
```

## 🏗️ Características

- ✅ Autenticación de usuarios (login/registro)
- ✅ Gestión completa de tareas (CRUD)
- ✅ Dashboard interactivo
- ✅ Configuración de perfil de usuario
- ✅ Diseño responsive con Tailwind CSS
- ✅ Reconocimiento de voz para crear tareas
- ✅ Notificaciones toast interactivas

## 🔒 Nota de Seguridad

Este proyecto utiliza **React 18.3.1** en lugar de React 19 debido a la vulnerabilidad crítica CVE-2025-55182 (React2Shell) presente en las versiones 19.x.

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.
