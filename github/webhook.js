//const secret = "your_secret_here";
const secret = process.env.GITHUB_HOOK_SECRET
const port = process.env.GITHUB_HOOK_PORT
console.log("envvvv", process.env, process.argv)

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

const command = '/usr/bin/nodejs github/start2.sh'

console.log("github webhook start....");
http.createServer(async function (req, res) {

    const buffers = [];
    console.log("github webhook data....");
    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const data = Buffer.concat(buffers).toString();

    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
    if (req.headers['x-hub-signature'] != sig) {
        console.log("github webhook sig error....");
        res.end();
        return;
    }
    let bb = JSON.parse(data); // 'Buy the milk'
    console.log("jsonssss", bb);
    if(bb.ref !== 'refs/heads/master'){
        console.log("github webhook branch not....");
        res.end();
        return;
    }
    exec(command);
  
    res.end();
}).listen(parseInt(port));