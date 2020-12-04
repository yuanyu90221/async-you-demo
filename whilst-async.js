const http = require('http');
const async = require('async');
const argv = process.argv.slice(2);
const url = argv[0];
var responseString = '';
let count = 0;
function getRequest(done) {
  var body = '';  
  count++;
  http.get(url, function(res){  
    res.on('data', function(block){  
      body += block.toString();  
    });  
    res.on('end', function(){
      responseString = body;  
      done(null, count);  
    });  
  }).on('error', done);  
}

async.whilst(
  function(cb) {
    cb(null, !responseString.includes('meerkat'));
  }
  ,
  getRequest
  , function(err) {
    if (err) console.error(err);
    console.log(count);
});