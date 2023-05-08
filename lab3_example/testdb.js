// https://www.npmjs.com/package/sqlite4
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

db.serialize(function() {
  db.each("SELECT rowid AS id, f1, f2 FROM tbl", function(err, row) {
      console.log(row.id + ": " + row.f1 + " " + row.f2);
  });
  db.run("UPDATE tbl SET f1 = ? WHERE id = ?", "bar", 2);
  db.each("SELECT rowid AS id, f1, f2 FROM tbl", function(err, row) {
      console.log(row.id + ": " + row.f1 + " " + row.f2);
  });
});

db.close();
