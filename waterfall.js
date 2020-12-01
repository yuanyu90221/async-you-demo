const http = require('http');
const async = require('async');
const fs = require('fs');
const path = process.argv[2];
async.waterfall([
  function (cb) {
    fs.readFile(path, (err, data)=> {
      if (err) {
        cb(err)
      } else {
        cb(null, data);
      }
    })
  },
  function(url, cb){   
    var body = '';  
    http.get(url.toString().trimRight(), function(res){  
      res.on('data', function(chunk){  
        body += chunk.toString();  
      });  
      res.on('end', function(){  
        cb(null, body);  
      });  
    }).on('error', function(err) {  
      cb(err);  
    });  
  }  
],  function(err, result){  
  if (err) return console.error(err);  
  console.log(result);  
})