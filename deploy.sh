
echo "Deploying files to server...."

scp -r build/* root@68.183.122.195:/var/www/build/

echo "Done"
