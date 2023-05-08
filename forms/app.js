// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('/'))

app.get('/', function(req, res) {
  res.sendFile("index.html");
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


app.post('/submit', function(req,res) {
  const x = req.query.name || '' ;
  const y = req.query.blah || '' ;

  console.log("x " + x);
  console.log("y " + y);
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});


