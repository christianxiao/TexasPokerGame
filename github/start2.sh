echo 'start2.sh start.....'
# source ~/.profile
git checkout master
git pull
cd server
yarn install
npm run stop
npm run start

cd ../client
yarn install
npm run stop
npm run start
sudo ufw allow 80/tcp
sudo ufw allow $MYSQL_PORT/tcp
echo 'FINISH SUCCESS!'

