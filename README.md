# Multi Service Docker Containers

## Prerequisites:

- Install Docker Desktop: https://www.docker.com/products/docker-desktop

## Quick Start:

After cloning the repo follow these steps. 

1. Edit Hosts file:

```bash
sudo vim /etc/hosts
```

2. Add this to the end of your `/etc/hosts` file:

```
127.0.0.1            alison.test
127.0.0.1     db-api.alison.test
127.0.0.1     db-etl.alison.test
127.0.0.1    web-app.alison.test
127.0.0.1    web-cms.alison.test
127.0.0.1    web-etl.alison.test
127.0.0.1 server-api.alison.test
127.0.0.1 server-etl.alison.test
127.0.0.1 server-gql.alison.test
```

3. Type `ESC:wq` to save and quit vim.
4. In a Terminal window `cd` to the directory with the `docker-compose.yml` file.
5. Run the `docker-compose` command to build the images and start the containers.

```bash
docker-compose up --force-recreate --always-recreate-deps --build
```

6. Once all the docker containers have started try visiting: 
    - http://web-app.alison.test
    - http://web-cms.alison.test
    - http://web-etl.alison.test
    - http://server-api.alison.test
    - http://server-etl.alison.test
    - http://server-gql.alison.test


## Docker Compose

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

# Nginx

```bash

docker build . \
    --no-cache \
    --label web-app \
    --tag trozdol/web-app
```

```
docker run \
    --rm \
    --env ENV=dev \
    --publish 8081:80 \
    --network alison-net \
    --name web-app \
    --hostname web-app \
    trozdol/web-app
```


# MySQL

    docker build
        --no-cache \
        --label db-api \
        --name db-api \
        --mount type=bind,src=./db-api/my.cnf,dst=/etc/my.cnf \
        --mount type=bind,src=./db-api/data,dst=/var/lib/mysql \
        -d mysql/mysql-server

    docker run \
        --rm \
        --detach \
        --network alison-net \
        --publish 3306:3306 \
        --hostname server-gql \
        --name=db-api \
        mysql/mysql-server