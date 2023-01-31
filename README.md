# Helsinki-city-bike-app
Pre-assignment for Solita Dev Academy Finland
More info about it can be found here
[https://github.com/solita/dev-academy-2023-exercise](https://github.com/solita/dev-academy-2023-exercise)

# About
A simple app that queries data from frontend options to a database and displays it to the user
Frontend is made with React + MUI framework. Backend is made with node.js environment with
express and prisma as an ORM to query data from a MongoDB atlas database.

# Prerequisites
To run or build the app you must have npm and node.js installed
The node.js installer found here includes them both.
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

# Installation
1. Clone the repo
   ```sh
   git clone https://github.com/cjuto002-xamk/Helsinki-city-bike-app.git
   ```
2. From root directory in a terminal first run
   ```sh
   npm run install
   ```
This will install all dependencies required to build

3. From the root directory build both client and server with 
   ```sh
   npm run build-client
   ```

    ```sh
   npm run build-server
   ```
4. Start the backend that also serves the frontend with

    ```sh
   npm run start
   ```
Server should be now running at http://localhost:3100/ that you can
access from your browser


## **NOTE** **For database queries an .env file with access URL is needed that is not included in this repo**




## TODO
- [ ] Make more tests
- [ ] Add more filtering options
- [ ] Expand information in the single station view

See the [open issues](https://github.com/cjuto002-xamk/Helsinki-city-bike-app/issues) for a full list of proposed features (and known issues).

## Contact

Julius Tostlebe - julius.tostlebe@gmail.com

Project Link: [https://github.com/cjuto002-xamk/Helsinki-city-bike-app](https://github.com/cjuto002-xamk/Helsinki-city-bike-app)