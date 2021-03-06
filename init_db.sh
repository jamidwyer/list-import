#!/bin/sh

docker-compose run users-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run users-service knex seed:run --env development --knexfile app/knexfile.js
docker-compose run lists-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run lists-service knex seed:run --env development --knexfile app/knexfile.js
docker-compose run items-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run items-service knex seed:run --env development --knexfile app/knexfile.js
