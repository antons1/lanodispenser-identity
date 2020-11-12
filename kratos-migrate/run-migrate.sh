#!/bin/bash

docker stop kratos-migrate
docker rm kratos-migrate
docker build . -t kratos-migrate
docker run -it --network kratos-network kratos-migrate