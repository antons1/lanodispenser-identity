# Lanodispenser Identity

Identity management for Lanodispenser. To be used as identity solution for apps living under *.lanodispenser.no domain.
Based on [ory/kratos](https://github.com/ory/kratos)

The app consists of three parts:

* A PostgreSQL DB
* [ory/kratos](https://github.com/ory/kratos) as IdM
* A (currently very barebones) client to allow users to log in and administer their credentials

## Running locally

1. Start the database from /db with `./run-db.sh`
2. (If you have not already:) Build and run kratos-migrate in /kratos-migrate. This will set up the tables in the database
    - Run `docker build -t kratos-migrate .` first
    - Run `docker container run --network kratos-network kratos-migrate` second
3. Run kratos from /kratos with `./run-identity.sh`
    - NB! The config needs to be updated to use local URLs
4. Run the client from /client with `npm start` (after `npm install`)

## Deploying

This (should) mostly just be running `kubectl apply -f deployment.yaml` in the folders in the correct order

* The password for the database needs to be set in a secret (e.g. `kubectl create secret generic identity-db-pwd -f secrets/identity-db-pwd`)
* The cookie signing key for kratos needs to be set in a secret (e.g. `kubectl create secret generic identity-cookie-key -f secrets/cookie-signing-key`)

The deployments are set up to pull from the local registry, so the images need to be built and pushed there before the deployments can get up and running.
Tagging of the images is done by the github actions, so the deployment manifests do not speciy any specific tag. If you are deploying for the first time, you can just
push the images without any tag and apply the manifest, and it will work. If, on the other hand, you want to build and push a specific image, you need to tag the image
before pushing, and either change the tag in the manifest, or manually set the container image of the deployment.

1. `kubectl apply -f db/deployment.yaml`
2. (If this is the first deployment)
    - `kubectl apply -f kratos-migrate/deployment.yaml`
    - Wait until pod has completed
    - `kubectl delete -f kratos-migrate/deployment.yaml`
3. `kubectl apply -f kratos/deployent.yaml`
4. `kubectl apply -f client/deployment.yaml`

Of course, these all depend on the docker image being built and pushed to the correct repository