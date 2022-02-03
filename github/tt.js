const exec = require('child_process').execSync;
const command = 'sh github/start2.sh'
exec(command, {stdio: 'inherit'});