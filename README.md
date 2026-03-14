# Práctica: Autenticación con Keycloak

Instrucciones para ejecutar el proyecto.

---

## Requisitos

- Docker y Docker Compose
- Node.js (v18 o superior)

---

## 1. Levantar Keycloak

```bash
docker compose up -d
```
(Ejecutar desde la raíz del proyecto.)

Esperar 20-30 segundos. Luego abrir: **http://localhost:8080**

- Usuario: `admin`
- Contraseña: `admin_password`

---

## 2. Ejecutar el backend

```bash
cd backend
npm install
node server.js
```

El servidor queda en **http://localhost:3000**

- Ruta pública: `GET http://localhost:3000/api/publico`
- Ruta protegida: `GET http://localhost:3000/api/privado` (requiere token JWT)

---

## 3. Configuración en Keycloak

En la consola de Keycloak (http://localhost:8080):

1. Crear realm **LaboratorioDev**
2. Crear cliente **backend-api** (Client authentication + Service accounts + Authorization code)
3. En el cliente, en Valid redirect URIs: `https://oauth.pstmn.io/v1/callback`
4. Crear usuario **estudiante1** y asignarle contraseña (no temporal)
5. En **Authentication** → Flows → **Browser** → OTP en **Required**

---

## 4. Landing con registro y seguridad

1. **En Keycloak** (realm LaboratorioDev):
   - **Realm settings** → pestaña **Login** → activar **User registration**.
   - **Clients** → **Create client** → Client ID: `landing-app` (cliente público, Standard flow ON).
   - En el cliente `landing-app`: Root URL `http://localhost:3001`, Valid redirect URIs `http://localhost:3001/*`, Web origins `http://localhost:3001`.

2. **Ejecutar la landing**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Abrir **http://localhost:3001**. Desde ahí puedes **Registrarte** o **Iniciar sesión**; solo los usuarios autenticados ven la landing segura.

---