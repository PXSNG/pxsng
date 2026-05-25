#!/bin/bash
set -e

LOCKFILE="/opt/oracle/scripts/startup/.custom_setup_done"

# 1. Check if the lockfile exists. If it does, silently exit.
if [ -f "$LOCKFILE" ]; then
  echo "Setup already completed. Skipping initialization."
  exit 0
fi

echo "Executing setup_db_core.sql..."

# 2. Run the SQL script (Paths updated to /startup/)
sqlplus / as sysdba <<SQL
WHENEVER SQLERROR EXIT SQL.SQLCODE;
ALTER SESSION SET CONTAINER = FREEPDB1;

DEFINE APP_USER=${APP_USER}
DEFINE APP_USER_PWD=${APP_USER_PASSWORD}

@/opt/oracle/scripts/startup/sql/setup_db_core.sql
EXIT;
SQL

# 3. Create the lockfile so this script never runs again
touch "$LOCKFILE"
echo "Database custom setup complete!"
