# cs302-final-project
Dependencies: 
.env file (below)
Install node.js (at least version v20.15.1)

To run backend local the user will need a ./backend/.env file containing a MongoDb_URI

File Example:
PORT=5000
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cs302-final-cluster.j7iht.mongodb.net/Test?retryWrites=true&w=majority&appName=cs302-final-cluster

To run the frontend:
C:\ cs302-final-project> cd frontend
C:\ cs302-final-project\frontend> npm install
C:\ cs302-final-project\frontend> npm run dev

*In a separate terminal
To run the backend:
C:\ cs302-final-project> cd backend
C:\ cs302-final-project\backend> npm install
C:\ cs302-final-project\backend> npm run dev

Once both running, open the local server
http://localhost:3000

Then, enter a word or phrase into search bar
Examples:
parking on residential streets
building permit requirements
yard waste collection
fences

It should then return the most relevant municipal codes
you may have to refresh the page before typing in the search bar again

