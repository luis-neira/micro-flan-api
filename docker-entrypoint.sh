#!/bin/sh

set -e

echo "Migrating the databse..."
npm run db:init 

echo "Starting the server..."
exec npm run dev 
