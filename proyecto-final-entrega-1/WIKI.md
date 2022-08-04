# Ignix | Develop

## Start - Serve

`npm start` o `ng serve`

## Build

`ng build --prod`

## Build sin hash

`ng build --prod --output-hashing none`

# Initial

### PROCESO PARA INICIAR EL PROYECTO.

- Entrar por invitación al grupo de desarrolladores del proyecto.

- Antes de ingresar al proyecto a trabajar hace falta [generar una key](https://docs.gitlab.com/ee/ssh/README.html#generate-an-ssh-key-pair) para clonar el proyecto.


- Debe ser del tipo ed25519:

  `ssh-keygen -t ed25519 -C "<comment>"`

- Una vez generada se pega en (img1):

- Se procede a clonar (img.2).

- En visual studio code se clona el repo

  `git clone git@bitbucket.org:hubbing/hubbingfront.git`

- Se inicializa el proyecto se descargan las dependencias:

  `npm i`

  Y se inicia el proyecto local (generalmente: `http://localhost:4200`):

  `npm start`

### Si el proyecto no inicia con este comando:
  Identificar versiones de:
  
  * NodeJs
  * Angular
  * Git

*Se sugiere instalar las últimas versiones

- Ver si el usuario de git y la url son correctos:

`git remote -v` (verifica la url del repositorio remoto)

- si sigue sin funcionar, asegurar la url:

`git remote add origin urlDelRepositorio`

- Y volver a comprobar

### Para otras posibles soluciones:

[Ver en Git](https://git-scm.com/book/es/v2/Personalizaci%C3%B3n-de-Git-Configuraci%C3%B3n-de-Git)



## PROCESO PARA MERGE

Existen 3 branches (`main, develop y qa`)
cada uno dirigido a una url correspondiente por medio de la configuración de los archivos environment propiamente generados para ello.
Se modifica desde `build:ambiente` (variable en Docker)

Ejemplo de la linea de Docker

`RUN npm run build:dev` (dev/prod/qa)

Como se mencionó, se relaciona con environment de Angular para los 3 ambientes (ver ambientes de hubbing, que se reemplazaran directamente por variables de entorno) y toma la uri del endpoint correspondiente.

### Proceso para resolución de historias (Jira):

Por historia se crea una rama basada en `develop` (previo pull de `develop`) con la nomenclatura del código de Jira por ej `PH-1314`.

1 .Nos posicionamos en develop:

`git checkout -b new_branch` (crea y se posiciona en new_branch)

- Se desarrolla la historia

`ng build --prod` (para comprobar que no haya errores)

### Si no da error:

`git add .` (. o nombre del archivo/s a commitear) 

`git commit -m "mensaje referido al cambio que se hizo"`

### Si hay error: Corregir

`git add .` (. o nombre del archivo/s a commitear)

`git commit -m "mensaje referido al cambio que se hizo"`

`git pull origin develop`

/_corregir si hay conflictos_/ - Seleccionar cuáles cambios se mantienen (merging)

> Nota: forma de identificar, buscar por `">>>>>"` dentro del directorio.

`git add .` (. o nombre del archivo/s a commitear)

`git commit -m "mensaje referido al cambio que se hizo"`

`git push origin "new_branch"` (se genera la url para seleccionar la rama a mergear)

Luego debe asignarse el pedido de merge request y aceptar (se genera la url para hacer el merge)

Revisar commits atrás o adelante, aprobar y hacer merge.

### Para merge en qa:

Hacer un merge request de develop y verificar que el `build` en Docker (Dockerfile) sea de `qa` -> `RUN npm run build:dev`

*Si hay errores en el build, revisar los commits anteriores

Herramienta sugerida: `GIT Graph` en Visual Studio Code.

> *Se sugiere tener las últimas versiones de frameworks, dependencias y librerías

### Otros comandos que pueden servir:

`git status` (ver el estado del branch y los archivos)

`git branch -d branchName` (borrar un branch local)

`git branch -D branchName` (borrar un branch remoto)

`git log --oneline` (para ver commits anteriores en forma resumida)

`git diff nombreArchivoUno nombreArchivoDos` (para ver diferencias entre dos archivos, entre branches).
