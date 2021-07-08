node --version

echo "ls"
ls

echo "ls api"
ls api

echo "ls app"
ls app

echo "ls server"
ls server

sed -i "s|PRIVATE_GOOGLE_MAPS_API_KEY|${GOOGLE_MAPS_API_KEY}|g" ./app/static/**/*.js
sed -i "s|PRIVATE_GOOGLE_MAPS_API_KEY|${GOOGLE_MAPS_API_KEY}|g" ./app/static**/*.js.map

chmod +x ./start-api-server.sh
chmod +x ./start-app-server.sh
 
./start-api-server.sh 2>&1&

./start-app-server.sh