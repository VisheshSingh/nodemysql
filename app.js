/*jshint esversion: 6 */

const express = require('express');
const mysql = require('mysql');

//create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

//Connect
db.connect((err) => {
  if(err){
    throw err;
  }else {
    console.log('MYSQL CONNECTION ESTABLISHED SUCCESSFULLY');
  }
});
//setup an express server
const app = express();
//create route
app.get('/createdb',(req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Database created');
  });
});
//create another route to create table
app.get('/createpoststable',(req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created');
  });
});
// create route insert Post1
app.get('/insertpost1',(req, res) => {
  let post = {title:'Post one', body:'This is the body for post #1'};
  let sql = 'INSERT INTO posts SET ?';
  let query =
    db.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Inserted 1 record');
    });
});
// create route insert Post2
app.get('/insertpost2',(req, res) => {
  let post = {title:'Post two', body:'This is the body for post #2'};
  let sql = 'INSERT INTO posts SET ?';
  let query =
    db.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Inserted 1 record');
    });
});

// create route select posts
app.get('/getposts',(req, res) => {
  let sql = 'SELECT * FROM posts';
  let query =
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Posts fetched...');
    });
});

// create route specific post
app.get('/getpost/:id',(req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query =
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post fetched...');
    });
});

// create route update post
app.get('/updatepost/:id',(req, res) => {
  let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query =
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post Updated...');
    });
});

// create route update post
app.get('/deletepost/:id',(req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query =
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Deleted post...');
    });
});


app.listen('3000', () => {
  console.log('Server started at port:3000');
});
