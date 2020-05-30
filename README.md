brew install node

Open terminal and go to the preferred location

* Run the following command:
npx create-react-app proiectWeb

* Go to /proiectWeb
* Copy all files from https://github.com/Anboias/ProiectWeb or from the proiectWeb.zip archive to the newly created /proiectWeb folder (Overwrite)

* Run the following commands:
npm install --save json-server
json-server --watch infojudete.json

* Modify package.json:
* Add the following two lines under `scripts`:
"json-server": "json-server --watch infojudete.json --port 5000",
"dev": "concurrently \"npm start\" \"npm run json-server\""
*Add the following line under `devDependencies`:
"proxy": "http://localhost:5000"

Execute with:
npm run dev