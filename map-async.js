const http = require('http');
const async = require('async');
const fs = require('fs');
const argv = process.argv.slice(2);
async.map(argv, function(item, cb) {
  var body = '';  
  http.get(item.toString().trimRight(), function(res){  
    res.on('data', function(chunk){  
      body += chunk.toString();  
    });  
    res.on('end', function(){  
      cb(null, body);  
    });  
  }).on('error', function(err) {  
    cb(err);  
  }); 
}, function (err, results) {
  if (err) return console.log(err)
  console.log(results);
})