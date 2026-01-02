# 🔗 Guía de Integración: Backend Procrastinant App

## 📌 Propósito

Este documento proporciona toda la información necesaria para que un agente de IA integre el **frontend** de Procrastinant App con su **backend API REST**.

---

## 🎯 Información General del Backend

### URLs del Backend

| Entorno        | Base URL                                         |
| -------------- | ------------------------------------------------ |
| **Local**      | `http://localhost:3000/api`                      |
| **Producción** | `https://procrastinant-app-be.onrender.com` |

### Tecnologías Implementadas

- **Runtime**: Node.js v24.12.0
- **Framework**: Express.js v5.2.1
- **Base de datos**: MongoDB (con Mongoose)
- **Autenticación**: JWT (JSON Web Tokens)
- **Encriptación**: bcrypt
- **Seguridad**: Helmet, CORS, Rate Limiting (100 req/15min)

---

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

1. **Registro/Login** → El backend devuelve un JWT token
2. **Frontend guarda el token** (localStorage, sessionStorage, o cookie)
3. **Todas las peticiones privadas** incluyen el token en el header `Authorization`
4. **Token expira** después de 7 días (configurable)

### Ejemplo de Autenticación

```javascript
// 1. Login/Registro - Obtener token
const response = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "usuario@example.com",
    password: "Password123",
  }),
});

const data = await response.json();
const token = data.data.token; // Guardar este token

// 2. Usar el token en peticiones privadas
const tareas = await fetch("http://localhost:3000/api/tareas", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Almacenamiento del Token

**Opciones recomendadas:**

1. **localStorage** (persistente entre sesiones)

   ```javascript
   localStorage.setItem("token", token);
   const token = localStorage.getItem("token");
   ```

2. **sessionStorage** (solo durante la sesión del navegador)

   ```javascript
   sessionStorage.setItem("token", token);
   ```

3. **Context/State Management** (React Context, Redux, Zustand, etc.)

---

## 📡 API Endpoints - Referencia Completa

### 🔓 Autenticación (`/api/auth`) - PÚBLICO

#### 1. Registro de Usuario

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**

```json
{
  "nombre": "María Cecilia",
  "apellido": "Luna",
  "alias": "mcecilialuna",
  "email": "maria@example.com",
  "password": "Password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "María Cecilia",
      "apellido": "Luna",
      "alias": "mcecilialuna",
      "email": "maria@example.com",
      "createdAt": "2025-12-31T20:28:37.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validaciones:**

- `nombre`: 2-50 caracteres
- `apellido`: 2-50 caracteres
- `alias`: 3-20 caracteres, alfanumérico + guiones bajos
- `email`: formato válido, único
- `password`: mínimo 8 caracteres

---

#### 2. Login

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "maria@example.com",
  "password": "Password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "María Cecilia",
      "apellido": "Luna",
      "alias": "mcecilialuna",
      "email": "maria@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 3. Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logout exitoso",
  "data": null
}
```

> **Nota**: El logout es opcional. El frontend puede simplemente eliminar el token almacenado.

---

### ✅ Tareas (`/api/tareas`) - PRIVADO

Todos los endpoints requieren `Authorization: Bearer <token>`

#### 1. Obtener Todas las Tareas

```http
GET /api/tareas?sort=numeroOrden&order=asc&listo=false
Authorization: Bearer <token>
```

**Query Parameters (opcionales):**

- `sort`: Campo para ordenar (`numeroOrden`, `createdAt`, `descripcion`)
- `order`: Dirección (`asc`, `desc`)
- `listo`: Filtrar por estado (`true`, `false`)
- `page`: Número de página (default: 1)
- `limit`: Tareas por página (default: 50)

**Response (200):**

```json
{
  "success": true,
  "message": "Tareas obtenidas exitosamente",
  "data": {
    "tareas": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "userId": "507f1f77bcf86cd799439011",
        "descripcion": "Terminar proyecto de React",
        "listo": false,
        "numeroOrden": 1,
        "createdAt": "2025-12-31T20:45:00.000Z",
        "updatedAt": "2025-12-31T20:45:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 50,
      "pages": 1
    }
  }
}
```

---

#### 2. Crear Tarea

```http
POST /api/tareas
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "descripcion": "Terminar proyecto de React",
  "listo": false,
  "numeroOrden": 1
}
```

**Validaciones:**

- `descripcion`: 1-300 caracteres (requerido)
- `listo`: booleano (opcional, default: false)
- `numeroOrden`: número >= 0 (requerido)

**Response (201):**

```json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "tarea": {
      "_id": "507f...",
      "userId": "507f...",
      "descripcion": "Terminar proyecto de React",
      "listo": false,
      "numeroOrden": 1,
      "createdAt": "2025-12-31T20:45:00.000Z",
      "updatedAt": "2025-12-31T20:45:00.000Z"
    }
  }
}
```

---

#### 3. Actualizar Tarea

```http
PUT /api/tareas/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (todos los campos son opcionales):**

```json
{
  "descripcion": "Terminar proyecto de React y Next.js",
  "numeroOrden": 2
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "tarea": {
      "_id": "507f...",
      "descripcion": "Terminar proyecto de React y Next.js",
      "listo": false,
      "numeroOrden": 2,
      "updatedAt": "2025-12-31T21:00:00.000Z"
    }
  }
}
```

> **Nota**: NO se puede cambiar `listo` con este endpoint. Usar `/toggle` para eso.

---

#### 4. Toggle Estado de Tarea

```http
PATCH /api/tareas/:id/toggle
Authorization: Bearer <token>
Content-Type: application/json
```

**Opción 1: Toggle automático (sin body)**

```http
PATCH /api/tareas/:id/toggle
```

**Opción 2: Establecer estado específico**

```json
{
  "listo": true
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Estado de tarea actualizado",
  "data": {
    "tarea": {
      "_id": "507f...",
      "listo": true,
      "updatedAt": "2025-12-31T21:05:00.000Z"
    }
  }
}
```

---

#### 5. Eliminar Tarea

```http
DELETE /api/tareas/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Tarea eliminada exitosamente",
  "data": null
}
```

---

#### 6. Reordenar Tareas

```http
POST /api/tareas/reorder
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "orden": [
    { "tareaId": "507f1f77bcf86cd799439012", "numeroOrden": 2 },
    { "tareaId": "507f1f77bcf86cd799439013", "numeroOrden": 1 },
    { "tareaId": "507f1f77bcf86cd799439014", "numeroOrden": 3 }
  ]
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Tareas reordenadas exitosamente",
  "data": {
    "tareasActualizadas": 3
  }
}
```

---

### 👤 Usuario (`/api/user`) - PRIVADO

#### 1. Obtener Perfil

```http
GET /api/user/profile
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "user": {
      "_id": "507f...",
      "nombre": "María Cecilia",
      "apellido": "Luna",
      "alias": "mcecilialuna",
      "email": "maria@example.com",
      "createdAt": "2025-12-31T20:28:37.000Z"
    }
  }
}
```

---

#### 2. Verificar Autenticación

```http
GET /api/user/verify
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Usuario autenticado",
  "data": {
    "userId": "507f...",
    "email": "maria@example.com"
  }
}
```

**Uso**: Para verificar si el token sigue válido (health check de sesión).

---

#### 3. Actualizar Perfil

```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (todos los campos son opcionales):**

```json
{
  "nombre": "María Cecilia",
  "apellido": "Luna García",
  "alias": "mcluna"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Perfil actualizado exitosamente",
  "data": {
    "user": {
      "_id": "507f...",
      "nombre": "María Cecilia",
      "apellido": "Luna García",
      "alias": "mcluna",
      "email": "maria@example.com"
    }
  }
}
```

---

#### 4. Cambiar Contraseña

```http
PUT /api/user/password
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456",
  "confirmPassword": "NewPassword456"
}
```

**Validaciones:**

- `currentPassword`: requerido
- `newPassword`: mínimo 8 caracteres, diferente a la actual
- `confirmPassword`: debe coincidir con `newPassword`

**Response (200):**

```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente",
  "data": null
}
```

---

#### 5. Eliminar Cuenta

```http
DELETE /api/user/account
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "password": "Password123",
  "confirmacion": "ELIMINAR"
}
```

**Validaciones:**

- `password`: contraseña actual correcta
- `confirmacion`: debe ser exactamente `"ELIMINAR"`

**Response (200):**

```json
{
  "success": true,
  "message": "Cuenta eliminada exitosamente",
  "data": null
}
```

> **⚠️ ADVERTENCIA**: Esta acción es **IRREVERSIBLE**. Elimina el usuario y **TODAS sus tareas**.

---

### 🏥 Health Check (`/api/health`) - PÚBLICO

```http
GET /api/health
```

**Response (200):**

```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "data": {
    "status": "healthy",
    "timestamp": "2025-12-31T20:28:37.000Z"
  }
}
```

**Uso**: Para verificar que el backend está funcionando.

---

## 🚨 Manejo de Errores

### Estructura de Respuestas de Error

```json
{
  "success": false,
  "message": "Mensaje de error descriptivo",
  "errors": [
    {
      "field": "email",
      "message": "El email ya está registrado"
    }
  ]
}
```

### Códigos de Estado HTTP

| Código | Significado           | Cuándo ocurre                                 |
| ------ | --------------------- | --------------------------------------------- |
| 200    | OK                    | Petición exitosa                              |
| 201    | Created               | Recurso creado exitosamente                   |
| 400    | Bad Request           | Error de validación (datos incorrectos)       |
| 401    | Unauthorized          | Token inválido, expirado o ausente            |
| 403    | Forbidden             | Sin permisos para acceder al recurso          |
| 404    | Not Found             | Recurso no encontrado                         |
| 429    | Too Many Requests     | Límite de peticiones excedido (rate limiting) |
| 500    | Internal Server Error | Error del servidor                            |

### Errores Comunes y Soluciones

#### ❌ 401 Unauthorized

```json
{
  "success": false,
  "message": "Token inválido o expirado",
  "errors": null
}
```

**Solución**: Redirigir al usuario al login y solicitar nueva autenticación.

#### ❌ 400 Bad Request (Validación)

```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [
    {
      "field": "descripcion",
      "message": "La descripción debe tener entre 1 y 300 caracteres"
    },
    {
      "field": "numeroOrden",
      "message": "El número de orden debe ser >= 0"
    }
  ]
}
```

**Solución**: Mostrar los errores en el formulario correspondiente.

#### ❌ 404 Not Found

```json
{
  "success": false,
  "message": "Tarea no encontrada",
  "errors": null
}
```

**Solución**: Mostrar mensaje al usuario o actualizar la lista de tareas.

#### ❌ 429 Too Many Requests

```json
{
  "success": false,
  "message": "Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde",
  "errors": null
}
```

**Solución**: Mostrar mensaje al usuario indicando que espere unos minutos.

---

## 🔧 Configuración de CORS

El backend ya tiene CORS configurado para permitir:

- **Origen permitido**: `http://localhost:5173` (frontend de Vite)
- **Métodos HTTP**: GET, POST, PUT, DELETE, PATCH
- **Headers**: Content-Type, Authorization
- **Credenciales**: Habilitadas

### Para Producción

**Actualizar en el backend** la variable de entorno `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://tu-frontend-produccion.com,https://www.tu-frontend-produccion.com
```

---

## 📦 Ejemplo de Implementación en React

### 1. Servicio de API (api.js)

```javascript
// src/services/api.js

const API_BASE_URL = "http://localhost:3000/api";

// Helper para obtener el token
const getToken = () => localStorage.getItem("token");

// Helper para headers con autenticación
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ------ AUTENTICACIÓN ------

export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  },

  logout: async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    localStorage.removeItem("token");
  },
};

// ------ TAREAS ------

export const tareasAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/tareas?${params}`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  },

  create: async (tarea) => {
    const response = await fetch(`${API_BASE_URL}/tareas`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(tarea),
    });
    return await response.json();
  },

  update: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return await response.json();
  },

  toggle: async (id, listo = null) => {
    const response = await fetch(`${API_BASE_URL}/tareas/${id}/toggle`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: listo !== null ? JSON.stringify({ listo }) : undefined,
    });
    return await response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await response.json();
  },

  reorder: async (orden) => {
    const response = await fetch(`${API_BASE_URL}/tareas/reorder`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ orden }),
    });
    return await response.json();
  },
};

// ------ USUARIO ------

export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  },

  verify: async () => {
    const response = await fetch(`${API_BASE_URL}/user/verify`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  },

  updateProfile: async (updates) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return await response.json();
  },

  changePassword: async (passwords) => {
    const response = await fetch(`${API_BASE_URL}/user/password`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(passwords),
    });
    return await response.json();
  },

  deleteAccount: async (password) => {
    const response = await fetch(`${API_BASE_URL}/user/account`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ password, confirmacion: "ELIMINAR" }),
    });
    return await response.json();
  },
};

// ------ HEALTH CHECK ------

export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  },
};
```

### 2. Ejemplo de Uso en Componentes

```javascript
// Login.jsx
import { useState } from "react";
import { authAPI } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authAPI.login({ email, password });

      if (result.success) {
        // Redirigir al dashboard
        window.location.href = "/dashboard";
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

```javascript
// TareasList.jsx
import { useState, useEffect } from "react";
import { tareasAPI } from "../services/api";

function TareasList() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTareas();
  }, []);

  const loadTareas = async () => {
    try {
      const result = await tareasAPI.getAll({
        sort: "numeroOrden",
        order: "asc",
      });

      if (result.success) {
        setTareas(result.data.tareas);
      }
    } catch (err) {
      console.error("Error cargando tareas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const result = await tareasAPI.toggle(id);

      if (result.success) {
        // Actualizar la lista
        loadTareas();
      }
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {tareas.map((tarea) => (
        <div key={tarea._id}>
          <input
            type="checkbox"
            checked={tarea.listo}
            onChange={() => handleToggle(tarea._id)}
          />
          <span>{tarea.descripcion}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ Checklist de Integración

Al integrar el frontend, asegúrate de:

- [ ] Configurar la URL del backend correctamente (`http://localhost:3000/api` en desarrollo)
- [ ] Implementar almacenamiento del JWT token (localStorage/sessionStorage)
- [ ] Incluir el header `Authorization: Bearer <token>` en todas las peticiones privadas
- [ ] Manejar respuestas de error (especialmente 401 Unauthorized para redirigir al login)
- [ ] Implementar manejo de errores de validación (400) mostrando los errores en el UI
- [ ] Manejar rate limiting (429) mostrando mensaje al usuario
- [ ] Implementar loading states mientras se hacen peticiones
- [ ] Limpiar el token al hacer logout
- [ ] Verificar que el token siga válido al iniciar la app (`/api/user/verify`)
- [ ] Actualizar CORS en producción con el dominio del frontend desplegado

---

## 🧪 Testing con Postman

Una colección completa de Postman está disponible en:

```
/postman/Procrastinant-API.postman_collection.json
```

### Cómo usar:

1. Importar el archivo en Postman
2. Ejecutar el endpoint de **Login** o **Registro**
3. El token se guarda automáticamente en la variable `{{token}}`
4. Todos los endpoints privados usarán este token automáticamente

**Variables de colección:**

- `{{baseUrl}}`: `http://localhost:3000/api`
- `{{token}}`: Se establece automáticamente al hacer login

---

## 📝 Variables de Entorno del Backend

El backend requiere estas variables de entorno:

```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/procrastinant-app-BE

# JWT
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=7d

# Bcrypt
BCRYPT_SALT_ROUNDS=10

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Environment
NODE_ENV=development
```

---

## 🚀 Flujo de Trabajo Recomendado

### Primera carga de la aplicación

1. Verificar si hay token guardado
2. Si hay token, verificar si sigue válido (`GET /api/user/verify`)
3. Si es válido, cargar datos del usuario y tareas
4. Si no es válido, redirigir al login

### Después del Login/Registro

1. Guardar el token recibido
2. Cargar perfil del usuario (`GET /api/user/profile`)
3. Cargar tareas del usuario (`GET /api/tareas`)
4. Redirigir al dashboard

### Gestión de Tareas

1. **Crear**: `POST /api/tareas` → Actualizar lista local
2. **Toggle**: `PATCH /api/tareas/:id/toggle` → Actualizar estado local
3. **Actualizar**: `PUT /api/tareas/:id` → Actualizar tarea local
4. **Eliminar**: `DELETE /api/tareas/:id` → Remover de lista local
5. **Reordenar**: `POST /api/tareas/reorder` → Actualizar orden local

---

## 🔍 Recursos Adicionales

- **Colección Postman**: `postman/Procrastinant-API.postman_collection.json`
- **README del Backend**: Documentación completa de la API
- **Repositorio**: [https://github.com/MCeciliaLuna/procrastinant-app-BE](https://github.com/MCeciliaLuna/procrastinant-app-BE)

---

## 🆘 Soporte

Si necesitas más información sobre el backend:

1. Revisar el `README.md` del backend
2. Consultar la colección de Postman
3. Contactar al desarrollador del backend

---

**Documento generado usando la colección Postman y el código fuente del backend de Procrastinant App**
