# Discord Clone - Frontend

## Descripción
Frontend de Discord Clone construido con React.js que replica las funcionalidades principales de Discord con diseño responsive para desktop y móvil.

## Rutas de la Aplicación

Rutas Públicas
- `/` - Página de login (redirecciona a `/login`)
- `/login` - Formulario de inicio de sesión
- `/register` - Formulario de registro de usuario

Rutas Protegidas (requieren autenticación)
- `/home` - Vista principal con lista de workspaces
- `/workspace/:workspace_id` - Vista de canales del workspace
- `/workspace/:workspace_id/:channel_id` - Chat del canal específico

Vistas y Componentes Principales
    LoginScreen
    - Formulario de autenticación
    - Validación de campos
    - Redirección a registro

    RegisterScreen
    - Formulario de registro
    - Verificación de email
    - Confirmación de contraseña

    HomeScreen
    - Layout principal con tres columnas
    - WorkspaceSidebar: Navegación entre workspaces
    - ChannelSidebar: Lista de canales del workspace
    - ChannelDetail: Área de chat y mensajes
    - Diseño responsive que se adapta a móvil

    WorkspaceSidebar
    - Lista de workspaces del usuario
    - Iconos y foto de workspaces
    - Navegación entre diferentes workspaces

    ChannelSidebar
    - Lista de canales del workspace seleccionado
    - Creación y eliminación de canales (admin)

    ChannelDetail
    - Cabecera con nombre del canal
    - Lista de mensajes en tiempo real
    - Formulario para enviar mensajes
    - Diferenciación entre mensajes propios y de otros