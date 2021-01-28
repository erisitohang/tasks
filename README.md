# Getting Started

# Web App

### Clone this repo

```shell
$ git clone git@github.com:erisitohang/tasks.git
$ cd tasks
```

### Docker

```shell
$ docker-compose up -d --build
```
### Run Migration
```shell
$ docker exec -it ens_server sh -c "npm run db:migrate"
```
### Run Seed
```shell
$ docker exec -it ens_server sh -c "npm run db:seed"
```

### Run Application
open http://0.0.0.0:3000 from browser  

