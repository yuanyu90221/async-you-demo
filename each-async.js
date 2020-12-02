const http = require('http');
const async = require('async');
const fs = require('fs');
const argv = process.argv.slice(2);
async.each(argv, function(item, cb){
  http.get(item.toString().trimRight(), function(res){  
    res.on('data', function(chunk){    
    });  
    res.on('end', function(){  
      return cb();  
    });  
  }).on('error', function(err) {  
    cb(err);  
  });
}, function(err) {
  if (err) {
    console.error(err);
  }
});