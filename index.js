const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const port = process.env.NODE_PORT || 8080;
var app = express();

app.listen(
    port, () => console.log(`Listening on port ${port}..`)
);
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true
    }
);

mysqlConnection.connect(
    (err)=> {
        if(!err)
            console.log('Connection Established Successfully');
        else
            console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    }
);

app.get('/', 
    (req, res) => {
        res.send('Hello World!')
    }
)

app.get('/health', 
    (req, res) => {
        res.status(200).send('healthy');
    }
)

app.get('/contacts' , 
    (req, res) => {
        mysqlConnection.query(
            'SELECT * FROM contactdetails', (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            }
        )
    } 
);

app.get('/contacts/:id' , 
    (req, res) => {
        mysqlConnection.query(
            'SELECT * FROM contactdetails WHERE contact_id = ?',[req.params.id], (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            }
        )
    } 
);

app.post('/contacts', 
    (req, res) => {
        let contact = req.body;
        var sql = "SET @contact_id = ?;SET @firstname = ?;SET @lastname = ?;SET @email = ?;SET @phone = ?; CALL contactAddOrEdit(@contact_id,@firstname,@lastname,@email,@phone);";
        mysqlConnection.query(
            sql, [
                contact.contact_id, 
                contact.firstname, 
                contact.lastname, 
                contact.email, 
                contact.phone
            ], (err, rows, fields) => {
                if (!err)
                    rows.forEach(
                        element => {
                            if(element.constructor == Array)
                                res.send('New Contact ID : '+ element[0].contact_id);
                        }
                    );
                else
                    console.log(err);
            }
        )
    }
);

app.put('/contacts', 
    (req, res) => {
        let contact = req.body;
        var sql = "SET @contact_id = ?;SET @firstname = ?;SET @lastname = ?;SET @email = ?;SET @phone = ?; CALL contactAddOrEdit(@contact_id,@firstname,@lastname,@email,@phone);";
        mysqlConnection.query(
            sql, [
                contact.contact_id, 
                contact.firstname, 
                contact.lastname, 
                contact.email, 
                contact.phone
            ], (err, rows, fields) => {
                if (!err)
                    res.send('Contact ID Details Updated Successfully');
                else
                    console.log(err);
            }
        )
    }
);

app.delete('/contacts/:id', 
    (req, res) => {
        mysqlConnection.query(
            'DELETE FROM contactdetails WHERE contact_id = ?', [req.params.id], (err, rows, fields) => {
                if (!err)
                    res.send('Contact ID deleted successfully.');
                else
                    console.log(err);
            }
        )
    }
);