# API High Level

Una aplicación web moderna con arquitectura frontend que incluye gestión de citas médicas y componentes reutilizables.

## 🚀 Características

- **API RESTful** para gestión de appointments
- **Componentes modulares** y reutilizables
- **Interfaz moderna** con CSS y JSX
- **Configuración de desarrollo** optimizada con Vite
- **Estructura organizada** por módulos y funcionalidades

## 📁 Estructura del Proyecto

```
frontend/
├── node_modules/           # Dependencias del proyecto
├── public/                 # Archivos públicos estáticos
├── src/                    # Código fuente principal
│   ├── api/
│   │   └── appointments.js # API para gestión de citas
│   ├── components/         # Componentes React/JS
│   │   ├── App.css        # Estilos de la aplicación principal
│   │   ├── App.jsx        # Componente principal
│   │   ├── index.css      # Estilos globales
│   │   ├── index.jsx      # Punto de entrada de componentes
│   │   └── main.jsx       # Archivo principal de la aplicación
├── .env                    # Variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── eslint.config.js       # Configuración de ESLint
├── index.html             # Archivo HTML principal
├── package-lock.json      # Lock de dependencias
├── package.json           # Configuración y dependencias
└── vite.config.js         # Configuración de Vite
```

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React/JavaScript
- **Build Tool**: Vite
- **Linting**: ESLint
- **Styling**: CSS3
- **Package Manager**: npm

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/joelPalaciosLaricano/api-high-level.git
   cd api-high-level
   ```

2. **Cambiar a la rama de desarrollo**
   ```bash
   git checkout fr
   ```

3. **Navegar al directorio frontend**
   ```bash
   cd frontend
   ```

4. **Instalar dependencias**
   ```bash
   npm install
   ```

5. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar el archivo .env con tus configuraciones
   ```

6. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint para revisar el código

## 🏥 Funcionalidades Principales

### Gestión de Appointments
- Crear nuevas citas médicas
- Consultar citas existentes
- Actualizar información de appointments
- Eliminar citas

### Componentes
- Interfaz de usuario modular
- Componentes reutilizables
- Estilos consistentes y modernos

## 🌐 API Endpoints

La aplicación incluye una API para gestión de appointments ubicada en `src/api/appointments.js`.

## 🚀 Despliegue

Para desplegar la aplicación:

1. **Construir para producción**
   ```bash
   npm run build
   ```

2. **Los archivos optimizados estarán en el directorio `dist/`**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Joel Palacios Laricano**
- GitHub: [@joelPalaciosLaricano](https://github.com/joelPalaciosLaricano)

## 📞 Soporte

Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
