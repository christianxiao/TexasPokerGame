//const secret = "your_secret_here";
const secret = process.env.GITHUB_HOOK_SECRET
const port = process.env.GITHUB_HOOK_PORT

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

const command = 'sudo /usr/bin/nodejs github/start2.sh'

console.log("github webhook start....");
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        console.log("github webhook....", req);
        if (req.headers['x-hub-signature'] == sig) {
            exec(command);
        }
    });

    res.end();
}).listen(parseInt(port));