# simple_web_contact using nodejs and docker-compose

simple_web_contact is a contact application using nodejs with deployment using docker-compose.

## Installation

install the required packages:
* [nodejs](https://nodejs.org/en/download/)
* [docker engine](https://docs.docker.com/engine/install/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [python](https://www.python.org/downloads/)

## Usage

To start developing, clone this repository, then install the dependencies:
```bash
$ git@github.com:LutfyTand/simple_web_contact.git

# deploy
$ docker-compose up -d --build

# database migrations
$ sh migrate.sh

# stoping
$ docker-compose down

# stoping with remove all image
$ docker-compose down --rmi all
``` 

test the application with [browser](http://localhost) or using curl 
```bash
$ curl --request GET 'http://localhost'
```

test crud application with curl
```bash
# GET
$ sh crud-api-test.sh get

# POST
$ sh crud-api-test.sh post

# PUT
$ sh crud-api-test.sh put

# POST
$ sh crud-api-test.sh delete 3 # 3 is contact_id
```

## Deployment
* Rollback

basically the docker-compose that I made is not optimal to roll back to v1 because the service version in docker-compose currently has a `depend_on` from the database service.
to further optimize the rollback process, the service application (web_contact) should be done separately by the Docker build process and use tagging (don't use the newest tag) so it can still use the same docker-compose file that's on the current branch. so the solution, remove `build` and update `image` with tagging from docker-compose file.

command for build docker image
```bash
$ docker build -t web-contact:v1 .
```
```yaml
  web_contact:
    image: web-contact:v1 # v1 is tagging and and can be changed according to the desired version
    container_name: web_contact
    ports:
      - $NODE_LOCAL_PORT:$NODE_PORT
    networks:
      - simple_contact
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:$NODE_PORT/health" ]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
    restart: 'on-failure'
    env_file: ./.env
    environment:
      - DB_HOST=db_contact
      - DB_USER=$DB_USER
      - DB_ROOT_PASSWORD=$DB_ROOT_PASSWORD
      - DB_DATABASE=$DB_DATABASE
      - DB_PORT=$DB_PORT
    depends_on:
      - db_contact
```
* Scale

It's very simple to scale up/down containers with docker-compose, you can follow this command:
```bash
$ docker-compose scale web_contact=3 #scale up to 3 containers

$ docker-compose scale web_contact=1 # scale down to 1 containers
```
but since writing my docker-compose file for `container_name` is hard-coded, it's not possible. the solution is to remove the `container_name` in the docker-compose file, because the `container_name` must be unique.

## Load Test Application
Load test application using [locust](https://locust.io/)

The easiest way to install Locust is from [PyPI](https://pypi.org/project/locustio/), using [pip](https://pypi.org/project/pip/):
```python
# install locust
pip3 install locust

# start locust
locust

```
access locust web base on browser [http://localhost:8089](http://localhost:8089)

![](https://docs.locust.io/en/stable/_images/webui-splash-screenshot.png)