#USER,PORT,PROJECT,GITHUB_HOOK_SECRET; MYSQL_USER,
sudo cp github/webhook.service /etc/systemd/system/webhook.service
sudo sed -i "s/GITHUB_HOOK_USER/$GITHUB_HOOK_USER/gi" /etc/systemd/system/webhook.service
sudo sed -i "s/GITHUB_HOOK_PORT/$GITHUB_HOOK_PORT/gi" /etc/systemd/system/webhook.service
sudo sed -i "s/GITHUB_HOOK_PROJECT/$GITHUB_HOOK_PROJECT/gi" /etc/systemd/system/webhook.service
sudo ufw allow $GITHUB_HOOK_PORT/tcp
chmod +x github/start2.sh

sudo systemctl enable webhook.service
sudo systemctl start webhook
sudo systemctl status webhook

sudo mkdir /etc/systemd/system/nginx.service.d/
sudo cp github/nginx-service.conf /etc/systemd/system/nginx.service.d/override.conf
sudo sed -i "s/GITHUB_HOOK_USER/$GITHUB_HOOK_USER/gi" /etc/systemd/system/nginx.service.d/override.conf
sudo sed -i "s/GITHUB_HOOK_PORT/$GITHUB_HOOK_PORT/gi" /etc/systemd/system/nginx.service.d/override.conf
sudo sed -i "s/GITHUB_HOOK_PROJECT/$GITHUB_HOOK_PROJECT/gi" /etc/systemd/system/nginx.service.d/override.conf

sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
