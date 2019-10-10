# List Importer

## Summary
https://mherman.org/blog/developing-microservices-node-react-docker/

Clone this repo.

Start things up:

```
export NODE_ENV=development
docker-compose down
docker-compose up --build
sh init_db.sh
```

## Structure
| Name            | Service| Container| Tech                 |
|-----------------|--------|----------|----------------------|
| Web             | Web    | web      | React, React-Router  |
| Lists API       | Lists  | lists    | Node, Express        |
| Lists DB        | Lists  | lists-db | Postgres             |
| Users API       | Users  | users    | Node, Express        |
| Users DB        | Users  | users-db | Postgres             |
| Items API       | Items  | items    | Node, Express        |
| Items DB        | Items  | items-db | Postgres             |
| Swagger         | Lists  | swagger  | Swagger UI           |

## Thank you!
Because I wanted node, postgres, and Docker...
https://mherman.org/blog/developing-microservices-node-react-docker/

