#!/bin/sh

echo "Migrating the databse..."
npm run db:init 

echo "Starting the server..."
npm run dev 
