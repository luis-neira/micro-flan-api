#!/bin/sh

set -e  # makes script exit if any command fails

echo "Migrating the databse..."
npm run db:init 

echo "Starting the server..."
exec npm run dev 
