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

# stoping
$ docker-compose down

# stoping with remove all image
$ docker-compose down --rmi all
``` 
test the application with [browser](http://localhost) or using curl 
```bash
$ curl --request GET 'http://localhost'
```

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