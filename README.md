# api-rest-node-js-postgresql
Api built with node, express, JWT,sequelize,postgresql




## Table of contents
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Prerequisites](#prerequisites)
- [Settings](#settings)
- [License](#license)

## Features
    Add to base URL above


- Use the following Endpoints

    `POST /auth/signup` Create User Account, receive : {username, email, password}

    `POST /auth/signin` Login A User, receive : {username, password}

    `GET /grupos/` get all grupos               [needs be authenticated]    
    `POST /grupos/`  create a new grupo,        [needs be authenticated]        data: {clave, nombre}
    `PUT /grupos/:id`  update a specific grupo  [needs be authenticated]        data: {clave, nombre}           params: {id} 
    `DELETE /grupos/:id`  delete a specific grupo [needs be authenticated]                                      params: {id} 
    `GET /grupos/:id` get a specific grupo      [needs be authenticated]                                        params: {id} 


    `GET /productos/` get all productos               [needs be authenticated]    
    `POST /productos/`  create a new producto,        [needs be authenticated]        data: {clave, nombre,grupo}   
    `PUT /productos/:id`  update a specific producto  [needs be authenticated]        data: {clave, nombre,grupo}       params: {id} 
    `DELETE /productos/:id`  delete a specific producto [needs be authenticated]                                        params: {id} 
    `GET /productos/:id` get a specific producto      [needs be authenticated]                                          params: {id} 

    `GET /articulos/` get all articulos               [needs be authenticated]    
    `POST /articulos/`  create a new articulo,        [needs be authenticated]        data: {clave, nombre,partida,precio,firstBuy,lastBuy}   
    `PUT /articulos/:id`  update a specific articulo  [needs be authenticated]        data: {clave, nombre,partida,precio,firstBuy,lastBuy}       params: {id} 
    `DELETE /articulos/:id`  delete a specific articulo [needs be authenticated]                                                                  params: {id} 
    `GET /articulos/:id` get a specific articulo      [needs be authenticated]                                                                    params: {id} 



## Contributing
    I would love to hear from anyone that will like to contribute improvementing the code...

## Prerequisites
- NodeJs and Npm (https://nodejs.org/en/download/)

- PostgreSQL(https://www.postgresql.org/download/)

## Settings
  
  git clone this repo

   ```shell
   $ npm install
   ```
   After Setting up the database, create database tables running the command below, its advisable to run the command more than once and make sure your database is updated with the tables:

   ```shell
   $ uncomment this code block

   // db.sequelize.sync({force:true})
   //     .then(()=>{ 
   //         console.log("Drop and Resync Db");        
   //          //initial()
   //     });




   ```
   Start server by running:

   ```shell
   $ node server.js
   ```

    - create a new user
    - sign in

    - test the endpoints




## License
   None for now.


   <!-- 
    users

    restaurant
        - categorias
        - productos
        - productosimagenes
        - meseros
        - ordenes
        - preordenes

    categorias
        -productos        

    productos
        productosimagenes
        ordenesdetalles
        preordenesdetalles
    
    meseros
        ordenes



    ordenes
        ordenesdetalles

    preordenes
        preordenesdetalles


administrator
    podra

    restaurant
        crear  (1-3)
        modificar el nombre, direccion
        darlo de baja
        eliminarlo
            se tendria que eliminar todos los registros de todas las tablas.

    categorias
        crear
        modificar
        darla de baja
        eliminar
            - si no tiene productos
            - si tiene productos, quedarian volando (guardar bitacora de eliminacion)

    productos
        crear
        modificar
        dar de baja, desactivar
        eliminar
            - si no esta en detalles de ordenes o preordenes
            - si estuviera, solo se deberia dar de baja

            * si se elimina, hay que eliminar la foto


    meseros
        crear
        modificar
        dar de baja
        eliminar
            en caso de que no haya registros en ordenes
        
    ordenes.
        crear  NO
        modificar NO
        dar de baja     SI
        eliminar        SI

    ordenesdetalles
        crear   NO
        modificar NO
        dar de baja SI
        eliminar    SI

    PREordenes.
        crear       NO
        modificar   NO
        dar de baja     SI
        eliminar        SI

    preordenesdetalles
        crear           NO
        modificar       NO
        dar de baja SI
        eliminar    SI
    



    -->