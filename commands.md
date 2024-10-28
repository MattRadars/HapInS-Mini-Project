Commands:

Docker:
Access docker container: docker exec -it <docker id/name> /bin/bash
Access database: psql -U user -d mydatabase
Show database list: \dt

Prisma:
Run seed: npx prisma db seed

Hasura:
Export metadata: hasura metadata export
Apply metadata: hasura metadata apply
