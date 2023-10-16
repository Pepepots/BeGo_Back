# Prueba Tecnica

## Requisitos

Para correr la app ocupamos las siguientes tecnologias:

- Git
- Docker Compose (19.03.0+)
- Node.js (v18.15.0)
- Pnpm (v9.5.0)


## Clone repo

```sh
git clone https://github.com/Pepepots/BeGo_Back
cd BeGo_Back
```

## Configurar variables de entorno

### MongoDB
Copiar el archivo `.env.db.sample` y renombrar `.env.db`

```sh
cp .env.db.sample .env.db
```

Asegurese que el archivo `.env.db` recien creado siga esta estructura

```txt
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
```

Example:

```txt
MONGO_INITDB_ROOT_USERNAME=usr
MONGO_INITDB_ROOT_PASSWORD=pwd
```

### App
Copiar el archivo `.env.sample` y renombrar `.env`

```sh
cp .env.sample .env
```

Asegurese que el archivo `.env` recien creado siga esta estructura

```txt
MONGO_URL=
MAPS_KEY=
TOKEN_SECRET=
PORT=
```

Example:

```txt
MONGO_URL=mongodb://usr:pwd@192.168.0.1:27017
MAPS_KEY=SECRET
TOKEN_SECRET=SECRET
PORT=5000
```

## Correr Aplicacion

### Con docker

Ejecutar el siguiente comando para desplegar a produccion
```sh
docker compose -f docker-compose.prod.yml up -d --build
```

### Con npm 

Ejecutar el siguiente comando para desplegar en desarrollo
```sh
npm install
npm run dev
```

Ejecutar el siguiente comando para desplegar en produccion
```sh
npm install
npm run start
```

## Funcionamiento de la API

Se hizo una documentacion generada por POSTMAN sobre cada uno de los EP se puede visualizar en el siguiente link [Documentation](https://documenter.getpostman.com/view/19102840/2s9YR6bEEJ#c010e0e8-1709-4e4c-841b-cfa6a4245ba9)

Al igual se desplego en un servidor personal [Produccion](http://novelfractal.com/)


## Observaciones
Espero que la prueba les agrade quedo pendiente de las observaciones sobre ella muchas gracias por su tiempo