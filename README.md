# Marketplace Backend API

API REST para marketplace de productos con autenticación y autorización.

## 🚀 Características

- ✅ Autenticación JWT (login/registro)
- ✅ Roles de usuario (ADMIN/CUSTOMER)
- ✅ CRUD de productos con imágenes
- ✅ CRUD de categorías
- ✅ Filtrado por categorías
- ✅ Base de datos MySQL con Sequelize ORM
- ✅ CORS configurado para Vercel

## 📋 Requisitos

- Node.js 18+
- MySQL 5.7+

## 💻 Instalación Local

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (crear archivo `.env`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=marketplace
DB_USER=root
DB_PASSWORD=tu_password
PORT=3001
JWT_SECRET=tu_secreto_seguro
```

3. Inicializar la base de datos con datos de prueba:
```bash
npm run seed
```

4. Iniciar el servidor:
```bash
npm run dev
```

## 🔑 Credenciales de Prueba

**ADMIN:**
- Email: `admin@marketplace.com`
- Password: `admin123`

**CUSTOMER:**
- Email: `cliente@marketplace.com`
- Password: `cliente123`

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products?categoryId=1` - Filtrar por categoría
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (ADMIN)
- `PUT /api/products/:id` - Actualizar producto (ADMIN)
- `DELETE /api/products/:id` - Eliminar producto (ADMIN)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Obtener categoría
- `POST /api/categories` - Crear categoría (ADMIN)
- `PUT /api/categories/:id` - Actualizar categoría (ADMIN)
- `DELETE /api/categories/:id` - Eliminar categoría (ADMIN)

---

## 🌐 Despliegue en Render

### Paso 1: Preparar el Repositorio

1. Asegúrate de que todo esté en Git:
```bash
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

### Paso 2: Crear Base de Datos MySQL en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"MySQL"**
3. Configura:
   - **Name:** `marketplace-db`
   - **Database:** `marketplace`
   - **User:** (se genera automáticamente)
   - **Region:** Elige la más cercana
   - **Plan:** Free (o el que prefieras)
4. Click en **"Create Database"**
5. **Guarda estos datos** (aparecen en la página de la DB):
   - Internal Database URL
   - Hostname
   - Port
   - Database
   - Username
   - Password

### Paso 3: Crear Web Service

1. En Render, click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio

### Paso 4: Configurar el Servicio

**Basic Settings:**
- **Name:** `marketplace-backend` (o el que prefieras)
- **Region:** La misma que la base de datos
- **Branch:** `main`
- **Root Directory:** `backend-marketplace`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Plan:** Free (o el que prefieras)

### Paso 5: Variables de Entorno

En la sección **"Environment"**, agrega estas variables:

```env
DB_HOST=<hostname-from-render-db>
DB_PORT=3306
DB_NAME=marketplace
DB_USER=<username-from-render-db>
DB_PASSWORD=<password-from-render-db>
PORT=3001
JWT_SECRET=super_secreto_produccion_cambiar_por_uno_seguro
NODE_ENV=production
```

⚠️ **Importante:** Usa los datos de conexión INTERNOS de tu base de datos MySQL de Render.

### Paso 6: Deploy

1. Click en **"Create Web Service"**
2. Espera a que termine el despliegue (5-10 minutos)
3. Una vez desplegado, obtén tu URL: `https://tu-servicio.onrender.com`

### Paso 7: Inicializar Base de Datos

Después del primer despliegue, necesitas crear los datos iniciales:

**Opción A - Desde Render Shell:**
1. Ve a tu servicio en Render
2. Click en **"Shell"** (en el menú lateral)
3. Ejecuta:
```bash
npm run seed
```

**Opción B - Modificar temporalmente el código:**
1. Comentar la línea `process.exit(1)` en `src/server.js` si falla
2. Redeploy
3. Los modelos se sincronizarán automáticamente

### Paso 8: Verificar

Prueba tu API:
```bash
curl https://tu-servicio.onrender.com/api/products
```

Deberías ver la lista de productos en JSON.

---

## 🔧 Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Host de MySQL | `dpg-xxxxx-a.oregon-postgres.render.com` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `marketplace` |
| `DB_USER` | Usuario de MySQL | `marketplace_user` |
| `DB_PASSWORD` | Contraseña de MySQL | `xxxxxxxxxx` |
| `PORT` | Puerto del servidor | `3001` |
| `JWT_SECRET` | Secreto para JWT | Cadena aleatoria segura |
| `NODE_ENV` | Entorno | `production` |

---

## 📝 Notas Importantes

- ⚠️ El plan Free de Render **se duerme después de 15 minutos** de inactividad
- 🔄 La primera petición después de dormir tardará ~30 segundos
- 💾 La base de datos MySQL Free tiene **1GB de almacenamiento**
- 🔐 Cambia `JWT_SECRET` por algo más seguro en producción
- 📊 Revisa los logs en Render Dashboard si hay errores

---

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que las variables de entorno estén correctas
- Usa la URL de conexión INTERNA de Render (no la externa)
- Asegúrate de que la base de datos esté activa

### Error en el deploy
- Revisa los logs en Render Dashboard
- Verifica que `package.json` tenga el script `start`
- Asegúrate de que `Root Directory` esté configurado correctamente

### No hay datos en la base de datos
- Ejecuta `npm run seed` desde el Shell de Render
- O crea los datos manualmente usando las rutas POST

---

## 📚 Más Información

- [Documentación de Render](https://render.com/docs)
- [Sequelize ORM](https://sequelize.org/)
- [Express.js](https://expressjs.com/)
