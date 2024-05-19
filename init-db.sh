#!/bin/bash
set -e

# Create the main database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE wack-db;
EOSQL

# Create the shadow database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE wack-db-shadow;
EOSQL
