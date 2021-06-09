# Multi Service Docker Containers

Build based on docker-compose file and don't use cached images.

```bash
docker-compose build --no-cache
```

Start and make sure everything is blown away and recreated from the ground up.

```bash
docker-compose up --force-recreate --always-recreate-deps --build
```

Create a named network dns hostnames to be resolved.

```bash
docker network create alison-net
```

## server-api

```bash
cd ./server-api
```

Build the Image from the Dockerfile:

```bash
docker build . \
    --no-cache \
    --label server-api \
    --tag trozdol/server-api
```

Run the container based on the above image:

```bash
docker run \
    --rm \
    --detach \
    --env NODE_ENV=dev \
    --env PORT=80 \
    --publish 8000:80 \
    --network alison-net \
    --name server-api \
    --hostname server-api \
    trozdol/server-api
```

## server-etl

```bash
cd ./server-etl
```

Build the Image from the Dockerfile:

```bash
docker build . \
    --no-cache \
    --label server-etl \
    --tag trozdol/server-etl
```

Run the container based on the above image:

```bash
docker run \
    --rm \
    --detach \
    --env NODE_ENV=dev \
    --env PORT=80 \
    --publish 8001:80 \
    --network alison-net \
    --name server-etl \
    --hostname server-etl \
    trozdol/server-etl
```

## server-gql

```bash
cd ./server-gql
```

Build the Image from the Dockerfile:

```bash
docker build . \
    --no-cache \
    --label server-gql \
    --tag trozdol/server-gql
```

Run the container based on the above image:

```bash
docker run \
    --rm \
    --detach \
    --env NODE_ENV=dev \
    --env PORT=80 \
    --publish 8002:80 \
    --network alison-net \
    --name server-gql \
    --hostname server-gql \
    trozdol/server-gql
```
