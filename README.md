# directus-postgres-react

# Backend

npx create-directus-project my-directus-app
cd my-directus-app
npx directus start


# frontend

npx create-next-app@latest my-directus-frontend --typescript
cd my-directus-frontend

npm install @directus/sdk


# in main directory 
docker run --name pg-directus-test -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=directus_db -p 5433:5432 -d postgres

OR 

docker stop pg-directus-test
docker rm pg-directus-test

# Start fresh
docker run --name pg-directus-test \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=directus_db \
  -p 5433:5432 \
  -d postgres


📦 What you get:
A running PostgreSQL container accessible at localhost:5433

Username: postgres
Password: admin
Database: directus_db

This container can then be used as the database for Directus or any other service.


openapi generator

get the oas.json `http://0.0.0.0:8055/server/specs/oas`

docker run --rm \
  -v "${PWD}/openapi/dist:/local" \
  -v "${PWD}/frontend:/client" \
  openapitools/openapi-generator-cli:latest generate \
  -i /local/oas.json \
  -o /client/directus-api-client \
  -g typescript-axios \
  --skip-validate-spec
