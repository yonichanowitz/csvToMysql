# csvToMysql
converts csv files to mysql data, and sends to database

<h1> use in terminal with node.js</h1>

after filling in an .env file with database credentials,

in terminal, run `node index.js` adding the path of the CSV file, followed by the DB name

for example  `node index.js ../Dude.csv clientsDataBase`

do not run the command twice, as there is no checking for duplicates at the moment
