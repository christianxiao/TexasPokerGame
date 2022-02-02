echo 'start2.sh start.....'
source ~/.profile
git checkout master
git pull
cd server
yarn
npm stop
npm start

cd ../client
yarn
npm stop
npm start
sudo ufw allow 80/tcp
sudo ufw allow $MYSQL_PORT/tcp
echo 'FINISH SUCCESS!'

