//const secret = "your_secret_here";
const secret = process.env.GITHUB_HOOK_SECRET
const port = process.env.GITHUB_HOOK_PORT
const command = 'sh github/start2.sh'
const branch = 'refs/heads/master'

console.log("envvvv", process.env, process.argv)

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').execSync;

console.log("github webhook start....");
http.createServer(function (req, res) {
    let data = '';
    req.on('data', chunk => {
        console.log("github webhook data....");
        data += chunk;
    })
    req.on('end', () => {
      let sig = "sha1=" + crypto.createHmac('sha1', secret).update(data).digest('hex');
      if (req.headers['x-hub-signature'] != sig) {
          console.log("github webhook sig error....,"+sig+","+req.headers['x-hub-signature']);
          res.write('github webhook sig error....'+sig+","+req.headers['x-hub-signature']);
          res.end();
          return;
      }
      let bb = JSON.parse(data); // 'Buy the milk'
      console.log("jsonssss", bb);
      if(bb.ref !== branch){
          console.log("github webhook branch not....");
          res.write('github webhook branch not....'+bb.ref);
          res.end();
          return;
      }
      let aa;
      let er;
      try {
        aa = exec(command, {stdio: 'inherit'}).toString();
      }catch (err){ 
        console.log("output",err)
        console.log("sdterr",err.stderr.toString())
        er = err.stderr.toString()
      }
      res.write('successsss, ' + aa + "," + er);
    
      res.end();
    })
  
    //res.end();
}).listen(parseInt(port));