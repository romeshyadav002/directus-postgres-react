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

📦 What you get:
A running PostgreSQL container accessible at localhost:5433

Username: postgres
Password: admin
Database: directus_db

This container can then be used as the database for Directus or any other service.

