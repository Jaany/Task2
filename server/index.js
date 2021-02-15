const mysql = require('mysql');
const express = require('express');
var app = express(); 
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//create mysql connection 
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'

});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connected');
    else
    console.log('DB not connected.' );
});



app.listen(3000, ()=>console.log('Express server is running at port no: 3000'));







//retrieve the stores details 
// app.get('/stores', (res,req)=>{
//     mysqlConnection.query('SELECT * FROM stores', (err, rows, fields)=>{
//         if(!err)
//         console.log(rows);
//         else
//         console.log(err);
//     })
// });





//Retrieving a Store by ID

app.get('/stores/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM stores WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err){
        console.log(rows);
        res.status(200).send({
            data: rows,
        })}
        else
        console.log(err);
    })
});





//Retrieving list of stores with id's and names

app.get('/stores', (req,res)=>{
    mysqlConnection.query('SELECT id, name FROM stores', (err, columns, fields)=>{
        if(!err)
        console.log(columns);
        else
        console.log(err);
    })
});






//insert store
app.post('/insertStore', (req,res)=>{
    console.log("insert here");
    console.log(req.body)
    //console.log(req);
//const stores = { name: 'bzhaz', phone:'0986785432', city: 'Exmouth' };
mysqlConnection.query('INSERT INTO stores SET ?', req.body, (err, rows, fields) => {
    if(!err){
        console.log(rows);
        res.status(200).send({
            message: 'inserted successfully'
        })}
        else{
        console.log(err);
        res.status(400).send({
            message: 'unable to insert'
        })}
    })
});




//update any data belonging to a particular store
app.post('/updateStore/:id', (req,res)=>{
    console.log("update here");
    console.log(req.body);
    //const stores = { name: 'kani', phone:'0986785432', city: 'canada' };
    mysqlConnection.query('UPDATE stores SET ? WHERE id = ?',[req.body, req.params.id], (err, rows, fields) => { 
        if(!err){
            console.log(rows);
            res.status(200).send({
                message: 'updated successfully'
            })}
            else{
            console.log(err);
            res.status(400).send({
                message: 'unable to update'
            })}
        })
    });
    

   



    //find a store by name
    app.post('/findStore', (req,res)=>{
        mysqlConnection.query('SELECT id, name FROM stores WHERE name = "janany"', (err, columns, fields)=>{
            if(!err){
                console.log(columns);
                res.status(200).send({
                    data: columns,
                })}
                else{
                console.log(err);
                res.status(400).send({
                    data: [],
                    message: 'unable to find'
                })}
            })
    });


    