const http = require('http');
const async = require('async');
const argv = process.argv.slice(2);
const fetchData = (item,cb) => {
  var body = '';
  http.get(`${argv[0]}?number=${item}`, function(res){
    res.on('data', function(chunk){  
      body += chunk.toString();  
    });  
    res.on('end', function(){  
      cb(null, body);  
    });
  }).on('error', function(err){
    cb(err);
  })
}
async.reduce(['one', 'two', 'three'], 0, function(memo, item, cb){
  fetchData(item, function(err, result) {
    cb(null, memo+ Number(result))
  });
}, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});