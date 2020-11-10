#!/bin/bash

docker stop trip-collector-identity
docker rm trip-collector-identity
docker build . -t hantonsen/trip-collector-identity
docker run -d --name trip-collector-identity --network kratos-network -p 4433:4433 -p 4434:4434 hantonsen/trip-collector-identity