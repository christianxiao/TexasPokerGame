#USER,PORT,PROJECT; MYSQL_USER,
sudo cp github/webhook.service /etc/systemd/system/webhook.service
sudo sed -i "s/_USER_/$GITHUB_HOOK_USER/gi" /etc/systemd/system/webhook.service
sudo sed -i "s/_PORT_/$GITHUB_HOOK_PORT/gi" /etc/systemd/system/webhook.service
sudo sed -i "s/_PROJECT_/$GITHUB_HOOK_PROJECT/gi" /etc/systemd/system/webhook.service
sudo ufw allow $GITHUB_HOOK_PORT/tcp
chmod +x start2.sh

sudo systemctl enable webhook.service
sudo systemctl start webhook
sudo systemctl status webhook
