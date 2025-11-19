TechFlow - Sistema de Gestión de Proyectos y Tareas
📋 Descripción
TechFlow es una aplicación web moderna de gestión de proyectos y tareas, diseñada para equipos que buscan organizar y dar seguimiento a sus proyectos de manera eficiente. La aplicación ofrece una interfaz intuitiva con modo oscuro/claro, tablero Kanban interactivo, y exportación de datos.
✨ Características Principales
🔐 Autenticación y Seguridad

Sistema completo de registro e inicio de sesión
Autenticación basada en JWT
Protección de rutas privadas
Manejo automático de sesiones expiradas

📊 Dashboard

Vista general con estadísticas en tiempo real
Contadores de tareas (totales, completadas, pendientes, vencidas)
Estadísticas de proyectos activos
Acciones rápidas para crear proyectos y tareas
Feed de actividad reciente

📁 Gestión de Proyectos

Crear, editar y eliminar proyectos
Estados de proyecto: Activo, Completado, En Pausa
Búsqueda y filtrado por estado
Vista detallada con todas las tareas asociadas
Paginación de resultados

✅ Gestión de Tareas

Dos modos de visualización:

Vista en cuadrícula (Grid)
Vista de tablero Kanban (Board) con drag & drop


Crear, editar y eliminar tareas
Estados: Por Hacer, En Progreso, Completado
Prioridades: Baja, Media, Alta, Urgente
Asignación a miembros del equipo
Fechas de vencimiento
Búsqueda y filtrado múltiple
Exportación a CSV
Indicadores visuales para tareas vencidas

👥 Gestión de Equipo

Visualización de miembros del equipo
Contador de tareas asignadas por miembro
Información de contacto

🎨 Interfaz de Usuario

Diseño responsive (móvil, tablet, desktop)
Tema claro y oscuro
Animaciones suaves
Componentes reutilizables
Notificaciones toast para feedback
Scrollbar personalizado
Sidebar colapsable en móviles

🛠️ Tecnologías Utilizadas
Frontend

React 19.2.0 - Biblioteca de UI
TypeScript 5.9.3 - Lenguaje tipado
Vite 7.2.2 - Build tool y dev server
React Router DOM 7.9.6 - Enrutamiento
Tailwind CSS 3.4.1 - Framework de estilos
Headless UI 2.2.9 - Componentes accesibles
Hero Icons 2.2.0 - Iconos
Lucide React 0.554.0 - Iconos adicionales

Gestión de Estado y Datos

Axios 1.13.2 - Cliente HTTP
React Hot Toast 2.6.0 - Notificaciones
Date-fns 4.1.0 - Manipulación de fechas
Papaparse 5.5.3 - Exportación CSV

Drag & Drop

@dnd-kit/core 6.3.1 - Sistema de drag & drop
@dnd-kit/sortable 10.0.0 - Listas ordenables

Desarrollo

ESLint 9.39.1 - Linter
TypeScript ESLint 8.46.3 - Reglas de TypeScript
PostCSS 8.5.6 - Procesador CSS
Autoprefixer 10.4.22 - Prefijos CSS

📦 Estructura del Proyecto
techflow-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Select.tsx
│   │   ├── dashboard/
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── StatCard.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectFilters.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── ProjectList.tsx
│   │   ├── tasks/
│   │   │   ├── TaskBoard.tsx (Tablero Kanban)
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskFilters.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   └── team/
│   │       ├── TeamMemberCard.tsx
│   │       └── TeamMemberList.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   ├── useApi.ts
│   │   ├── useAuth.ts
│   │   ├── useProjects.ts
│   │   ├── useTasks.ts
│   │   └── useTheme.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── Projects.tsx
│   │   ├── Register.tsx
│   │   ├── TaskDetails.tsx
│   │   ├── Tasks.tsx
│   │   └── Team.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── projectService.ts
│   │   ├── taskService.ts
│   │   └── teamService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── exportCSV.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
🚀 Instalación y Configuración
Prerrequisitos

Node.js >= 20.19.0
npm >= 8.0.0

Pasos de Instalación

Clonar el repositorio

bashgit clone <url-del-repositorio>
cd techflow-app

Instalar dependencias

bashnpm install

Configurar variables de entorno

El backend está configurado en src/utils/constants.ts:
typescriptexport const API_BASE_URL = 'https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1';
Para desarrollo local, actualiza esta URL a tu backend local.

Ejecutar en modo desarrollo

bashnpm run dev
La aplicación estará disponible en http://localhost:5173

Construir para producción

bashnpm run build

Previsualizar build de producción

bashnpm run preview
📝 Scripts Disponibles
json{
  "dev": "vite",                    // Inicia servidor de desarrollo
  "build": "tsc -b && vite build",  // Compila TypeScript y construye para producción
  "lint": "eslint .",               // Ejecuta el linter
  "preview": "vite preview"         // Previsualiza el build de producción
}
🔑 Características Técnicas Destacadas
Context API

AuthContext: Maneja el estado de autenticación global
ThemeContext: Gestiona el tema (claro/oscuro) de la aplicación

Custom Hooks

useApi: Hook genérico para llamadas a la API con manejo de estado
useAuth: Acceso al contexto de autenticación
useProjects: Gestión completa de proyectos (CRUD + paginación)
useTasks: Gestión completa de tareas (CRUD + paginación)
useTheme: Acceso al contexto del tema

Servicios

authService: Autenticación y gestión de tokens
projectService: CRUD de proyectos
taskService: CRUD de tareas con filtros avanzados
teamService: Gestión de miembros del equipo

Interceptors de Axios

Inyección automática del token JWT
Manejo de errores 401 con redirección a login
Configuración global de headers

Componentes Reutilizables

Badge, Button, Card, Input, Modal, Select
Todos con soporte para modo oscuro
Variantes y tamaños personalizables

Tablero Kanban

Drag & drop funcional con @dnd-kit
Actualización automática del estado al mover tareas
Animaciones suaves
Vista overlay durante el drag
Indicadores visuales de estado

🎨 Sistema de Diseño
Colores

Primary: Azul (usado para acciones principales)
Success: Verde (estados completados/activos)
Warning: Amarillo (prioridades medias/altas)
Danger: Rojo (eliminación/urgente)
Info: Azul claro (información)

Modo Oscuro

Soporte completo con Tailwind's dark mode
Persistencia de preferencia en localStorage
Detección automática de preferencia del sistema
Transiciones suaves entre modos

Responsive Design

Mobile-first approach
Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
Sidebar colapsable en móviles
Grid adaptativo en todas las vistas

🔒 Seguridad

Tokens JWT almacenados en localStorage
Rutas protegidas con ProtectedRoute
Expiración automática de sesión
Validación de formularios
Sanitización de inputs

📊 Estado de la Aplicación
El estado se maneja mediante:

Context API para estado global (auth, theme)
Custom hooks para estado de features específicas
Estado local de React para UI components
localStorage para persistencia (token, user, theme)

🌐 API Backend
La aplicación se conecta a un backend REST API con los siguientes endpoints:

Auth: /auth/register, /auth/login, /auth/profile
Projects: /projects (GET, POST), /projects/:id (GET, PUT, DELETE)
Tasks: /tasks (GET, POST), /tasks/:id (GET, PUT, DELETE, PATCH)
Team: /team/members, /team/members/:id/tasks

📱 Funcionalidades por Página
Login/Register

Formularios validados
Feedback visual de errores
Redirección automática tras login exitoso

Dashboard

6 tarjetas de estadísticas
Acciones rápidas (crear proyecto/tarea)
Feed de actividad (preparado para implementación)

Proyectos

Lista con cards
Filtros: búsqueda y estado
Modal de creación/edición
Paginación
Vista de detalles con tareas asociadas

Tareas

Dos vistas: Grid y Kanban Board
Filtros múltiples: búsqueda, estado, prioridad
Exportación a CSV
Drag & drop en vista Kanban
Modal de creación/edición
Vista de detalles completa

Equipo

Lista de miembros
Contador de tareas asignadas
Información de contacto

Perfil

Visualización de datos del usuario
Edición de información personal
Avatar placeholder

🐛 Manejo de Errores

Toast notifications para feedback
Manejo de errores de red
Validación de formularios
Estados de carga en operaciones async
Mensajes de error descriptivos

♿ Accesibilidad

Componentes de Headless UI (accesibles por defecto)
Estructura semántica HTML
Labels en todos los inputs
Feedback visual y textual
Navegación por teclado

🚧 Mejoras Futuras

 Implementar feed de actividad real
 Notificaciones push
 Comentarios en tareas
 Archivos adjuntos
 Gráficas y reportes
 Filtros por fecha
 Búsqueda avanzada
 Etiquetas/tags
 Integraciones (Slack, GitHub, etc.)
 Modo offline
 Tests unitarios y e2e

 Equipo de Desarrollo
[Giancarlo] - Frontend Lead & Security
[Marcelo] -  Testing
[Diego] - Services