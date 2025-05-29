#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Required environment variables
required_vars=(
    "POSTGRES_PASSWORD"
)

# Check if all required environment variables are set
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Environment variable $var is not set." >&2
        exit 1
    fi
done

# Run Docker with dynamic environment variables
docker run -d \
    -p 5432:5432 \
    --name express-postgres \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    postgres:17
