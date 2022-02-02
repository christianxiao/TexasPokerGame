#cloud-boothook
#!/bin/bash

apt update 
#&
#process_id=$!
#wait $process_id

su - ubuntu

# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_

# nvm install node
# node -e "console.log('Running Node.js ' + process.version)"

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt update
sudo apt-get install -y nodejs npm yarn
sudo apt-get install -y systemd

echo 'export GITHUB_HOOK_ADDR="https://github.com/christianxiao/TexasPokerGame"' >> /home/ubuntu/.profile
echo 'export GITHUB_HOOK_PROJECT="TexasPokerGame"' >> /home/ubuntu/.profile
echo 'export GITHUB_HOOK_USER="ubuntu"' >> /home/ubuntu/.profile
echo 'export GITHUB_HOOK_PORT="8080"' >> /home/ubuntu/.profile
echo 'export GITHUB_HOOK_SECRET="111"' >> /home/ubuntu/.profile

echo 'export MYSQL_HOST="127.0.0.1"' >> /home/ubuntu/.profile
echo 'export MYSQL_PORT="3306"' >> /home/ubuntu/.profile
echo 'export MYSQL_USER="root"' >> /home/ubuntu/.profile
echo 'export MYSQL_PASSWORD="123456"' >> /home/ubuntu/.profile

source /home/ubuntu/.profile

echo 'install mysql---'
export DEBIAN_FRONTEND=noninteractive
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password $MYSQL_PASSWORD'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD'
sudo apt-get install mysql-server -y # &
#process_id=$!
#echo "waiting $(timstamp)" >>  /var/log/script-out 
#wait $process_id
#echo "waiting done $(timstamp)" >>  /var/log/script-out 
#wait for installation to complete
#sleep 120


git clone $GITHUB_HOOK_ADDR
cd $GITHUB_HOOK_PROJECT

mysql --user=$MYSQL_USER --password=$MYSQL_PASSWORD -e "CREATE DATABASE poker"
mysql --user=$MYSQL_USER --password=$MYSQL_PASSWORD poker < database/poker.sql
chmod +x github/start1.sh
./github/start1.sh

