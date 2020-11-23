# MERN-CINEMA-APP

The project of Cinema application, that allows users to easily book seats and manage cinemas.

## Status

Development

## Installation with docker (Recommended)
1. Clone or download the repo
2. Open project folder in terminal
3. Run in your terminal command  "docker-compose build" if your are at linux like os you probably need to type "sudo" before
4. If the building was successfully completed you can run "docker-compose up"
5. Congratulations, probably if everything went ok, you should be able to run in your browser http://localhost:3000/

## Installation without docker

1. Clone or download the repo
2. Download, install and run [MongoDB Community Server](https://www.mongodb.com/try/download/community)
3. Open folder /API
4. Make sure you have node v14.9.0 or newer installed, use npm to install: `npm install`
5. Once the installation is done, you can run the project: `npm start` for production or `npm run dev` for development mode
6. Open folder /Client
7. Open another commandline, use npm to install: `npm install`
8. Once the installation is done, you can run the project: `npm start`
9. Open http://localhost:3000/ to view in the browser.

## Usage

- For the first time you need to register
- After registration you will be automatically redirected to the login panel
- Please login to see all features at navbar
- Create your first movie, click "Add movie", fill in all fields (for image use url) and click create
- Next step is create room layout click "Add room", Enter number of rows, columns (if you want to do breaks between seats count it as a column or rows) , click "Create"
- You have been redirected to the second step, if you click on generated layout you can easily delete seat in this place
  -After create rooms you can see list of all rooms
  -Next step is creating a seanse, please click "Add seanse" and chose movie, room, date and fill in hour
  -Finally your movies are avaible in "Movies" bookmark at navbar to chose seance and book seats, please click on the "Seances" button below the movie
- Chose seance, and click on the seat you want to book (if you miss - Don't worry !, you can click one more again and this seats is being unmarked)
