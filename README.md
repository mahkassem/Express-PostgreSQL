# Express & PostgreSQL 🐘 + JWT Auth

![JWT](https://jwt.io/img/badge-compatible.svg "JWT Compatible")

Learn how to use PostgreSQL with Node JS using express server with JWT authentication.

## Requirments

1. [Node & NPM ⬇️](https://nodejs.org/en/) - (node v16), (npm v8)
2. [PostgreSQL ⬇️](https://www.postgresql.org/download/) - (v14)

### Create Database & User

#### Command Line Access

**Ubuntu:**

```bash
sudo -i -u postgres
```

**Windows:**

```bash
psql -U postgres
```

#### Create A User

[Docs](https://www.postgresql.org/docs/14/sql-createuser.html)

```sql
CREATE USER mahmoud WITH PASSWORD 'secret' SUPERUSER;
```

#### Create A Database

[Docs](https://www.postgresql.org/docs/14/sql-createdatabase.html)

```sql
CREATE DATABASE dailynews
    OWNER mahmoud
    ENCODING UTF8;
```

### db-migrate commands

**Create Migration:**

```bash
db-migrate create posts --sql-file
```

**Run Migrations:**

```bash
db-migrate up
```

**Reset Migrations:**

```bash
db-migrate reset
```

**Example migration up sql file:**

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Example migration down sql file:**

```sql
DROP TABLE posts;
```
