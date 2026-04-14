#!/bin/bash
set -e

sqlplus -S / as sysdba <<SQL
ALTER SESSION SET CONTAINER = FREEPDB1;
DEFINE APP_USER='${APP_USER}'
DEFINE APP_USER_PWD='${APP_USER_PASSWORD}'
@/opt/oracle/scripts/setup/sql/setup_db_core.sql
EXIT;
SQL
