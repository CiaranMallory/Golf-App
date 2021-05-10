const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'golfapp'
});

// Connect 
db.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('My sql connected');
    }
});

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname + '/public')));

// Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE GolfApp';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created successfully');
        return;
    });
    return;
});

// Create table
app.get('/createtable/:username/:password', (req, res) => {
    let sql = `CREATE TABLE ${req.params.username}(id int AUTO_INCREMENT, password VARCHAR(255), date VARCHAR(255), coursename VARCHAR(255), score VARCHAR(255), PRIMARY KEY(id))`;
    let post = {password: `${req.params.password}`};
    let sql2 = `INSERT INTO ${req.params.username} SET ?`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        return;
    });

    db.query(sql2, post, (err, result) => {
        if(err) throw err;
        res.json(result);
        return;
    });
});

// Insert score
app.get('/addscore/:username/:date/:coursename/:calculatedScore', (req, res) => {
    let post = {date: `${req.params.date}`, coursename: `${req.params.coursename}`, score: `${req.params.calculatedScore}`};
    let sql = `INSERT INTO ${req.params.username} SET ?`;
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        //console.log(result);
        console.log('Score Added');
        res.send('Score added');
        return;
    });
});

// Select all scores for username
app.get('/getallscores/:username', (req, res) => {
    let sql = `SELECT * FROM ${req.params.username}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.json(result);
        return;
    });
});

// Select scores by date
app.get('/getscore/:username/:date', (req, res) => {
    let sql = `SELECT * FROM ${req.params.username} WHERE date = ${req.params.date}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.json(result);
        return;
    });
});

// Search for user
app.get('/getuser/:username', (req, res) => {
    let sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        if(result.length === 0){
            res.json({userStatus: 0});
            return;
        } else {
            res.json({userStatus: 1});
            return;
        }
    });
});

// Search for users password
app.get('/getpassword/:username/:password', (req, res) => {
    let sql = `SELECT * FROM ${req.params.username} WHERE password = ${req.params.password}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        if(result.length === 0){
            res.json({passwordStatus: 0});
            return;
        } else {
            res.json({passwordStatus: 1});
            return;
        }
    });
});

// Get course data
app.get('/getcoursedata/:coursename', (req, res) => {
    let sql = `SELECT * FROM coursedata WHERE coursename = '${req.params.coursename}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.json(result);
        return;
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated');
        return;
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted');
        return;
    });
});

app.listen('3000', () => {
    console.log('Server running on port 3000');
});