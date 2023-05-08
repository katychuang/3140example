// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
const express = require('express');
const app = express();
const port = 5000;
var cors = require("cors");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

app.use(cors());
app.use(express.json());

app.get('/api', function(req, res) {
  const r_id = req.query.id || '' ;
  const f1 = req.query.f1 || '' ;
  const f2 = req.query.f2 || '';

  var results = [];
//  console.log("r_id " + r_id);

  var whereConditions = ((r_id === '' && f1 === '' && f2 === '') ? '' : 'WHERE ');
  if (r_id !== '') { whereConditions += `id = ${r_id} ` }
  if (f1 !== '') { whereConditions += `OR f1 = ${f1} ` }
  if (f2 !== '') { whereConditions += `OR f2 = ${f2} ` }
  console.log(whereConditions);
  db.serialize(function() {
    db.each(`SELECT rowid AS id, f1, f2 FROM tbl ${whereConditions}`, function(err, row) {
        results.push({ id: row.id, name: row.f1, classes: row.f2});
    },function() {
        res.send({"results": results});
    });
    
  });


});

app.get('/:id', function(req, res) {
  var results = [];
  db.serialize(function() {
    db.each("SELECT rowid AS id, f1, f2 FROM tbl WHERE rowid =" + req.params.id, function(err, row) {
        results.push({ id: row.id, name: row.f1, classes: row.f2});
    },function() {
        res.send({"results": results});
    });
    
  });
});


app.post('/update/:id', function(req,res) {
  const r_id = req.params.id || '' ;
  const f1 = req.query.f1 || '' ;
  const f2 = req.query.f2 || '';

  var results = [];
  console.log("r_id " + r_id);

  var insertValues = '';
// ((r_id === '' && f1 === '' && f2 === '') ? '' : 'SET ');
//  if (r_id !== '') { insertValues += `id = ${r_id} ` }
  if (f1 !== '') { insertValues += `f1 = '${f1}' ` }
  if (f2 !== '') { insertValues += `, f2 = '${f2}' ` }

  console.log(insertValues);
  var str = ["UPDATE tbl SET", insertValues, "WHERE ID = ", r_id].join(" ");
   console.log("str", str);
   db.run(str);  
//    var str = join(" ", "UPDATE tbl SET ? WHERE id = ?", insertValues, r_id));

    db.each("SELECT rowid AS id, f1, f2 FROM tbl", function(err, row) {
        console.log(row.id + ": " + row.f1 + " " + row.f2);
    });

    db.close();
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});


