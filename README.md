<p align="center">
    <img src="./view/static/img/icon.png" width="100"/>
</p>

# Cloud ☁️

### Con esta aplicación puedes acceder a funcionalidades como:
* Guardar tus archivos
* Guardar tus carpetas
* Descargar archivos
* Visualizar archivos en el navegador
* Borrar archivos y carpetas
* Navegar entre las carpetas

<br>

## Tecnologías
* Django con API REST
* React + Vite
* CSS Modules
* Font awesome

<br>

## Referencias
* [Diseño en el que me basé](https://dribbble.com/shots/14961092-Dropbox-Monochrome-Recent-Files)
* [Repositorio de dónde la idea fue tomada](https://github.com/antoniosarosi/home-cloud)

<br>

# Ejecutándolo en local

### Descargas el proyecto de github
```bash
git clone https://github.com/Rolando1010/Cloud
```
<br>

### Para ejecutar el proyecto necesitas
* Python
* PIP
* Django
* Django REST Framework

<br>

### Desde una terminal ingresas a la raíz del proyecto, accedes tu entorno virtual y ejectuas el proyecto
```bash
cd Cloud
workon [virtual-env]
python manage.py run server
```

<br>

Tienes otros comandos a disposición para realizar otras actividades
```bash
# Compilar los archivos státicos
python manage.py collectstatic

# Abres una terminal y puedes usar individualmente sin errores las funcionalidades del proyecto
python manage.py bash
```

<br>

# Ejecutando React

Se usa Vite y se ubica en la carpeta view/cloud-view

Necesitarás NPM

Para ejecutarlo usas los siguientes comandos:

```bash
# Instalar dependencias
npm install

# Ejecutar proyecto en modo desarrollo
npm run dev

# Compilar el proyecto
npm run build
```

<br>

Cuándo quieras realizar un cambio en react y plasmarlo en los archivos devueltos por el servidor de Django, tendrás que seguir los siguientes pasos.

* Ejectuas el comando para compilar el proyecto de react: npm run build
* Vas a la carpeta generada dir
* Mover el archivo html generado generado a views/templates y nombrarlo como view.html, si ya existe, se elimina el anterior
* Mover el archivo js en assets a la carpeta static/js en view y renombrar dicho archivo cómo bundle.js
* Mover el archivo css en assets a la carpeta static/css en view y renombrar dicho archivo cómo styles.css
* Las imágenes moverlas a la carpeta static/img en view y renombrarlas como se desee
* Todos los archivos estáticos pueden ser renombrados cómo se deseen pero las referencias a ellos tendrán que ser asignadas correctamente a los nombres asignados, se puede también personalizar el sistema de carpetas, pero con la correspondiente y correcta modificación de las referencias a estos en las partes que se utilicen.
* En el archivo HTML generado las etiquetas que hagan referencia a archivos estáticos se cambian al sistema que Django utiliza para cargar sus propios archivos estáticos.
* Con el archivo js hay que quitar el type="module" y el crossorigin y colocar un defer