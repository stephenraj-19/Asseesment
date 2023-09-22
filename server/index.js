const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const { send } = require('express/lib/response');

const add = express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({ extended: true }))
add.use(express.static('public'));


let conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "The great@12",
    database: "Assesment"
})

conn.connect(function (error) {
    if (error) {
        console.log(error)

    } else {
        console.log('db connected successfully')
    }
})

add.get('/select', (request, response) => {
    let getQuery = 'select * from user;'
    conn.query(getQuery, (error, result) => {
        if (error) {
            response.send(error);
        } else {
            let result = { "status": "success" }
            response.send(result)
        }
    })
})
add.get('/selectone/:id', (request, response) => {
    let { id } = request.params;
    let getQuery = 'select * from user where id= ?;'
    conn.query(getQuery, [id], (error, result) => {
        if (error) {
            response.send(error);
        } else {
            response.send(result)
        }
    })
})
const uuid = require('uuid').v4();


add.post('/create', (request, response) => {

    let { created_at,updated_at,first_name,middle_name, last_name,country_code,country_number,mobile_number, email,address,area_id,photo} = request.body;

    let id = uuid;
    let insertQuery = 'insert into assesment.user(id,created_at,updated_at,first_name,middle_name, last_name,country_code,country_number,mobile_number, email,address,area_id,photo)values(?,?,?,?,?,?,?,?,?,?,?,?,?);';
    conn.query(insertQuery, [ id, created_at,updated_at,first_name,middle_name, last_name,country_code,country_number,mobile_number, email,address,area_id,photo], (error, result) => {
        if (error) {
            let val = { "status": "error" }
            response.send(error);
        } else {
            let val = { "status": "success" }
            response.send(val);
        }
    });
});

add.delete('/delete/:id', (request, response) => {
    let { id } = request.params;
    let deleteQuery = 'delete from user where id= ?;'
    conn.query(deleteQuery, [id], (error, result) => {
        if (error) {
            response.send(error);
        } else {
            let result = { "status": "success" }
            response.send(result)
        }
    })
})

add.put('/update/:id', (request, response) => {
    let { id } = request.params;
    let {created_at,updated_at,first_name,middle_name, last_name,country_code,country_number,mobile_number, email,address,area_id,photo } = request.body;

    let updateQuery = 'update user set created_at=?,updated_at=?,first_name=?,middle_name=?, last_name=?,country_code=?,country_number=?,mobile_number=?, email=?,address=?,area_id=?,photo=?  where s_no= ?;';

    conn.query(updateQuery, [ id,created_at,updated_at,first_name,middle_name, last_name,country_code,country_number,mobile_number, email,address,area_id,photo], function (error, result) {
        if (error) {
            response.send(error);
        } else {
            let result = { "status": "success" }
            response.send(result)
        }
    })
})


add.listen(3012, () => {
    console.log("node is running under 3012 port");
})

