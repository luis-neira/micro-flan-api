#!/bin/sh

echo "Migrating the databse..."
npm run db:init 

echo "Starting the server..."
exec npm run dev 
