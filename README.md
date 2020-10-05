`docker-compose up --build`

# Migration

## Get container ID

`docker ps`

## Up

`docker exec -it {container id} npm run db:migration:up`

## Down

`docker exec -it {container id} npm run db:migration:undo`

## Seeder

`sudo docker exec -it {container id} npm run db:seed:up`