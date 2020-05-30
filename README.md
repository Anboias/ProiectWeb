
1. CREATE PROJECT

a) Run the following commands:
* brew install node (only if necessary - for npm and npx)
* npx create-react-app proiectweb
* npm install --save json-server

b) Copy all files from the arhive proiectWebCodSursa.zip to the newly created /proiectweb folder (Overwrite)


2. MODIFY package.json:

a) Add the following two lines under `scripts`:
* "json-server": "json-server --watch infojudete.json --port 5000",
* "dev": "concurrently \"npm start\" \"npm run json-server\""

b) Add the following lines as the last element in the json(at the same level as `scripts`):
* "proxy": "http://localhost:5000"


3. RUN PROGRAM

* npm run dev