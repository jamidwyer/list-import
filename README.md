# Microservice Lists

## Summary
Still working through:
https://mherman.org/blog/developing-microservices-node-react-docker/

Currently, to start things up, this might work:

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
| Swagger         | Lists  | swagger  | Swagger UI           |
| Users API       | Users  | users    | Node, Express        |
| Users DB        | Users  | users-db | Postgres             |
| Functional Tests| Test   | n/a      | TestCafe             |
