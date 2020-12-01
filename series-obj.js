const http = require('http');
const async = require('async');
const fs = require('fs');
const argv = process.argv.slice(2);
const fetchData = (url) => (cb) => {
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
};
async.series({
  requestOne: fetchData(argv[0]),
  requestTwo: fetchData(argv[1])
}, function(err, results){
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});