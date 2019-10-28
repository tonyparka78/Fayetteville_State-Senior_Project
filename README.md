# NodeJS CRUD App

NodeJS CRUD app with MySQL, Express, and EJS.

# Getting started
 
#### Install node packages and dependencies by entering "*npm install*" on the terminal.

#### 1. Download Mysql workbench from : https://www.mysql.com/fr/products/workbench/

#### 2. in the menu : Database --> Connect To Database ( use your username and password Mysql)

#### 3. in the menu click on icon (Create a new Shema..) choose a name and click "Apply"

#### 4. in menu : File --> RUN SQL SCRIPT and choose the file app.sql 
        - new window display in --> Default Schema Name choose your shema Created

#### 5. Creat a new user for database : 
        a-  Menu : Server --> Users And Priveleges 
        b-  Click on button : Add account --> window display : Details for account newuser where you add login and password --> Click Apply
        c-  Click on Administratifs Roles --> Select DBA --> Click Apply
        d-  Click on Shema Priveleges --> Add Entry --> Selected Shema (and choose shema created) --> Click Apply

#### 6. Edit database information at "*config.js*"  and change this information by the login and password user create and name shema : 
                user: ' username user in Mysql Workbench',
                password: 'password user in Mysql Workbench',
                db: 'shema name user in Mysql Workbench' 
            

#### 7. Run project. Enter "*node app.js" on the terminal.

#### 8. Finally, browse on "*localhost*:*3000*"
