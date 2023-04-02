# Frontend


## Setup

There are two ways to set up your environment:

1. Manual Installation
1. Docker

Docker is recommended because it is simpler.


### Installation

If you want to set up your environment manually, follow the instruction depending your OS:

- Mac: [installation/mac/README.md](installation/mac/README.md)
- Windows: [installation/windows/README.md](installation/windows/README.md)


### Docker

Follow [Install Docker Engine](https://docs.docker.com/engine/install/) to install `Docker Desktop`.


## Run the App

If you set up your environment manually, run:

```bash
npm start
```

If you use Docker, run:

```bash
docker-compose up -d
docker-compose exec react-app yarn start
```

If you get the `network mems-network declared as external, but could not be found` error, run:

```bash
docker network create mems-network --subnet=192.168.1.0/24 --gateway=192.168.1.1
```
