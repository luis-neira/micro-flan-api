#!/bin/sh

# echo "Waiting for Postgres to start..."
# sh ./wait-for db:5432 

echo "Migrating the databse..."
npm run db:init 

echo "Starting the server..."
npm run dev 
