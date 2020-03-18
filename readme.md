# using the Node.js Packages

1. using 'require()' object
   1. Discover, load and Cache object for the current application till it is not changed
      1. It will discover package from path, if found load it, else generation exception
         1. If package is found on path it will be evaluated, if this package has other dependencies (Standard/exernal(aks custom module)), then they will be discovred, loaded and cached
      2. If package is standard from Node.js, it will load and cache for the applciaiton
2. let pkg = require('<PACKAGE-NAME-FROM-PATH>')

# Node.js some standard packages

1. fs
   1. Used to read/write files and directories using Sync and Async methods
      1. readFile() / writeFile() --> Async methods
      2. readFileSync() / writeFileSync() --> Sync methods
2. http module

   1. The Mechanism of building Web Listener using Node.js application
   2. methods
      1. createServer(HTTP Request Listener callback)
         1. Used to process the HTTP Request
      2. request()
         1. Used to make HTTP Request to other HTTP Service
      3. listen(PORT)
         1. Open the PORT endpoint for HTTP Communication

# ==============================================================================

Using Express.js for Web App and REST APIs
Command to run
npm install --save express body-parser cors

Creating custom modules
module.exports = {....}

function xyz(){.....}
module.exports = xyz;

class MyClass {....}

module.exports = MyClassd

# ===============================================================================

Installing the Packages for sequelize ORM and MySql mysql2@^1.5.2

npm install --save sequelize mysql2@^1.5.2

1. Code First
   1. Derfine a JS Model derived from Model class of sequalize and generate tabel from it
2. Database First
   1. Database is ready with tables and SPs and then generate Models from the database
      1. Sequalize and sequalize-auto packages along with mysql2 package to generate JS classes from command line
      2. npm install -g sequelize sequelize-auto mysql2@^1.5.2
