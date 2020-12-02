const http = require('http');
const async = require('async');
const fs = require('fs');
const argv = process.argv.slice(2);
const url = `http://${argv[0]}:${argv[1]}`
const createUser = (n, cb) => {
  const data = JSON.stringify({
    user_id: n
  });
  const options = {
    hostname: argv[0],
    port: argv[1],
    method: 'POST',
    path: '/users/create',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  const req = http.request(options, function(res) {
    res.on('data', (chuck) => {});
    res.on('end', () => {
      cb(null);
    });
  })

  req.on('error', err=>{
    cb(err);
  });
  req.write(data);
  req.end();
}
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
  post: function(done) {
    async.times(5, function(n, next) {
      createUser(n+1, function(err) {
        next(err);
      });
    }, function(){
      done(null, "finished");
    });
  },
  get: fetchData(`${url}/users`)
}, function(err, results) {
  if (err) return console.error(err);
  console.log(results.get);
})