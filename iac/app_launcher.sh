echo TESTING ENVIRONNEMENT - HEALTHCHECK
npm test --prefix /home/vagrant/nodeapp/
echo LAUNCHING NODE APP
sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
npm start --prefix /home/vagrant/nodeapp/ 