//const secret = "your_secret_here";
const secret = process.env.GITHUB_HOOK_SECRET
const port = process.env.GITHUB_HOOK_PORT
console.log("envvvv", process.env, process.argv)

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

const command = '/usr/bin/nodejs github/start2.sh'

console.log("github webhook start....");
http.createServer(function (req, res) {
    let data = '';
    req.on('data', chunk => {
        console.log("github webhook data....");
        data += chunk;
    })
    req.on('end', () => {
      let sig = "sha1=" + crypto.createHmac('sha1', secret).update('').digest('hex');
      if (req.headers['x-hub-signature'] != sig) {
          console.log("github webhook sig error....");
          //res.write('github webhook sig error....'+sig);
          res.end();
          return;
      }
      let bb = JSON.parse(data); // 'Buy the milk'
      console.log("jsonssss", bb);
      if(bb.ref !== 'refs/heads/master'){
          console.log("github webhook branch not....");
          //res.write('github webhook branch not....'+bb.ref);
          res.end();
          return;
      }
      exec(command);
      //res.write('successsss');
    
      res.end();
    })
  
    //res.end();
}).listen(parseInt(port));