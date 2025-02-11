commands used for postegreSQL:
`psql -U postgres` to open postegreSQL as
`CREATE DATABASE form_data;` create the new database
`\c form_data;` to transition into the database
in powershell :
`psql -U postgres -d form_data -f ./postegreSQL_tables.sql`
to execute the sql script to create all tables.
`\dt` to list all tables

# HOW TO

## install all needed dependencies for NodeJs

`npm install pg` to install needed package to communicate with the database
`npm install nodemon --save-dev` to install nodemon as a dev dependency
`npm run start`
