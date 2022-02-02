git checkout master
git pull
cd server
yarn
npm stop
npm start
sudo ufw allow 80/tcp
cd ../client
yarn
npm stop
npm start
echo 'FINISH SUCCESS!'

