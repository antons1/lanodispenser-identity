#!/bin/bash

NETWORK=kratos-network
APP=kratos-db
PORT=5432
STORAGE=kratos-storage

ST_EXISTS=$(docker volume ls | grep $STORAGE)
NW_EXISTS=$(docker network ls | grep $NETWORK)

if [[ -z "$ST_EXISTS" ]]; then
    echo "Storage does not exist, creating..."
    docker volume create $STORAGE
fi

if [[ -z "$NW_EXISTS" ]]; then
    echo "Network does not exist, creating..."
    docker network create $NETWORK
fi

docker run -d --name $APP -p $PORT:$PORT -e POSTGRES_PASSWORD=testpostgrespwd --network $NETWORK -v $STORAGE:/var/lib/postgresql/data postgres:13