# exit when any command fails
set -e

# BUILD APP
echo "=========BUILDING APP========="
cd ./app
yarn --prod -silent install --frozen-lockfile
yarn build
mv ./build ../app-build
cd ../
rm -rf ./app
mv ./app-build ./app

# BUILD API
echo "=========BUILDING API========="
cd ./api
yarn -silent install --frozen-lockfile
yarn build
mv ./src/seed ./dist/seed
cp ./package.json ./dist/package.json
cp ./yarn.lock ./dist/yarn.lock
cd ./dist
yarn --prod -silent install --frozen-lockfile
cd ../
mv ./dist ../api-dist
cd ../
rm -rf ./api
mv ./api-dist ./api

# BUILD SERVER
echo "=========BUILDING SERVER========="
cd ./server
yarn --prod -silent install --frozen-lockfile
cd ../
yarn cache clean
