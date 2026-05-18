# Quick Reference Guide: setup_db_core.sql

## Overview
This SQL script sets up the complete database schema for the PXSNG course management system, including tables, constraints, indexes, PL/SQL packages, and triggers.

## Prerequisites
- Oracle Database 12c or higher
- SQL*Plus or compatible Oracle client
- FREEPDB1 pluggable database created
- Environment variables: APP_USER and APP_USER_PWD

## Usage

### Basic Execution
```bash
sqlplus sys/your_sys_password@//localhost:1521/FREEPDB1 as sysdba @setup_db_core.sql
```

### With Environment Variables
```bash
export APP_USER=myapp
export APP_USER_PWD=mypassword
sqlplus sys/password@//localhost:1521/FREEPDB1 as sysdba @setup_db_core.sql
```

## What Gets Created

### 1. Schema User
- Creates application schema user
- Grants necessary privileges
- 500MB quota on USERS tablespace

### 2. Tables (16 total)
| Table | Purpose | Key Features |
|-------|---------|--------------|
| COUNTRY | Countries reference | Identity PK |
| ZIPCODE | Postal codes | Composite PK (COUNTRY_ID, ZIP) |
| PROMO_CODE | Discount codes | Validation: 0-100% |
| ADDRESS | Physical addresses | Links to ZIPCODE composite FK |
| COMPANY | Company records | UUID PK |
| REFERRAL | Referral system | UUID PK, unique code |
| APP_USER | User accounts | UUID PK, unique email |
| PARTICIPANT | Course participants | Auto-increment ID |
| CATEGORY | Course categories | Unique labels |
| COURSE | Course catalog | Price validation (>= 0) |
| COURSE_BOOKING | Booking records | UUID PK |
| OFFER | Price offers | Discount tracking |
| BILLING | Billing records | Status tracking |
| CERTIFICATE | Course certificates | UUID PK, unique code |
| DOCUMENT | File references | Type-checked |
| SHOPPINGCART | Shopping carts | UUID PK |
| CARTITEM | Cart contents | Quantity > 0, cascade delete |

### 3. Constraints
- **Primary Keys**: All tables
- **Foreign Keys**: 22 relationships (3 deferred for circular deps)
- **Unique Constraints**: EMAIL, codes, labels
- **Check Constraints**: 
  - Price >= 0
  - Quantity > 0
  - Percentage 0-100
  - Boolean Y/N values

### 4. Indexes (27 total)
- All foreign key columns
- Status columns for filtering
- Improves join and query performance

### 5. PL/SQL Packages

#### USER_API_PKG
```sql
-- Get all users
user_api_pkg.get_all_users(p_users_cursor);

-- Create user (with auto shopping cart creation)
user_api_pkg.create_user_record(p_json_body, p_status_code, p_response_message);

-- Get user by ID
user_api_pkg.get_user_by_id(p_user_id, p_user_cursor);

-- Delete user
user_api_pkg.delete_user_record(p_user_id, p_status_code, p_response_message);
```

#### COURSE_API_PKG
```sql
-- Get all courses
course_api_pkg.get_all_courses(p_courses_cursor);

-- Get course by ID
course_api_pkg.get_course_by_id(p_course_id, p_course_cursor);
```

### 6. Triggers (7 auto-update triggers)
Automatically set UPDATED_AT timestamp on:
- PROMO_CODE
- APP_USER
- PARTICIPANT
- COURSE
- OFFER
- CARTITEM
- SHOPPINGCART

## Important Notes

### Circular Dependencies
Three foreign keys are DEFERRABLE to handle circular references:
- COMPANY.MANAGER_USER → APP_USER.ID
- REFERRAL.ORIGIN_USER_ID → APP_USER.ID
- APP_USER.REFERRAL_CODE_ID → REFERRAL.ID

When inserting related records, constraints are checked at transaction end (COMMIT).

### UUID Generation
UUIDs are generated as 32-character hex strings using `RAWTOHEX(SYS_GUID())`:
- Format: `A1B2C3D4E5F6...` (no hyphens)
- Suitable for VARCHAR2(36) columns

### Shopping Cart Creation
When creating a user via `create_user_record`:
1. Shopping cart is created first
2. User is created with reference to cart
3. Both committed together or rolled back on error

### Cascade Deletes
- Deleting a SHOPPINGCART automatically deletes all CARTITEMs

## Testing the Installation

```sql
-- Check tables created
SELECT table_name FROM user_tables ORDER BY table_name;

-- Check constraints
SELECT constraint_name, constraint_type, table_name 
FROM user_constraints 
ORDER BY table_name, constraint_type;

-- Check indexes
SELECT index_name, table_name FROM user_indexes ORDER BY table_name;

-- Check packages
SELECT object_name, object_type, status 
FROM user_objects 
WHERE object_type IN ('PACKAGE', 'PACKAGE BODY');

-- Check triggers
SELECT trigger_name, table_name, status FROM user_triggers;

-- Test user creation
DECLARE
   v_json CLOB := '{"firstname":"John","lastname":"Doe","email":"john@example.com","password_hash":"hash123"}';
   v_status NUMBER;
   v_msg CLOB;
BEGIN
   user_api_pkg.create_user_record(v_json, v_status, v_msg);
   DBMS_OUTPUT.PUT_LINE('Status: ' || v_status);
   DBMS_OUTPUT.PUT_LINE('Message: ' || v_msg);
END;
/
```

## Troubleshooting

### Error: "ORA-00955: name is already used"
**Solution**: Drop existing objects first
```sql
DROP USER your_app_user CASCADE;
```

### Error: "ORA-02291: integrity constraint violated - parent key not found"
**Cause**: Circular dependency issue or missing parent record
**Solution**: Use deferred constraints or insert parent records first

### Error: "ORA-12899: value too large for column"
**Cause**: UUID format mismatch
**Solution**: Verify using `RAWTOHEX(SYS_GUID())` for UUID generation

### Package Compilation Errors
```sql
-- View errors
SHOW ERRORS PACKAGE user_api_pkg;
SHOW ERRORS PACKAGE BODY user_api_pkg;

-- Or query
SELECT line, position, text 
FROM user_errors 
WHERE name = 'USER_API_PKG' 
ORDER BY sequence;
```

## Performance Tips

1. **Regular statistics gathering**:
```sql
EXEC DBMS_STATS.GATHER_SCHEMA_STATS(USER);
```

2. **Monitor index usage**:
```sql
SELECT index_name, table_name, num_rows 
FROM user_indexes 
WHERE table_name IN ('APP_USER', 'COURSE', 'COURSE_BOOKING');
```

3. **Check constraint status**:
```sql
SELECT constraint_name, status, deferrable, deferred 
FROM user_constraints 
WHERE constraint_type = 'R';
```

## Security Considerations

1. **Change default password** after installation
2. **Hash passwords** properly in application (use bcrypt/argon2)
3. **Grant minimal privileges** to application user
4. **Enable audit** on sensitive tables:
```sql
AUDIT SELECT, INSERT, UPDATE, DELETE ON APP_USER;
```

## Maintenance

### Backup Schema
```sql
expdp user/password schemas=your_app_user directory=DATA_PUMP_DIR dumpfile=backup.dmp
```

### Add Sample Data
After installation, consider adding:
- Countries and ZIP codes
- Sample categories
- Test users
- Demo courses

## Integration with ORDS

The packages are designed for ORDS REST API exposure. After installation:
1. Enable REST for schema
2. Create REST modules for packages
3. Define REST handlers
4. Test endpoints

## Support

For issues or questions:
- Check Oracle error messages
- Review CHANGES_SUMMARY.md for recent fixes
- Verify Oracle version compatibility (12c+)

