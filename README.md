# Pick 'Em or Kick 'Em  
*Analyze NBA player stats and performance trends to make smarter sports betting picks!*

**Full Website**: [https://main.d261zxqkub55fi.amplifyapp.com/](https://main.d261zxqkub55fi.amplifyapp.com/)


https://github.com/user-attachments/assets/e4a2d9de-549a-40d3-84b5-c86948dab778



## Built With:
#### Frontend  
* [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)  
* [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)  
* [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)  
* [![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)  
* [![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)  
On login or registration, the client sends a request to the backend using Axios (`/auth/loginUser` or `/auth/registerUser`). If successful, a JWT is stored in the localStorage for the user. Routes that aren't the root page are protected by `ProtectedRoutes` component which sends a request to the backend (`auth/verifyUser`) to verify if the JWT is valid or if the user even has a JWT. If valid, users can access the routes, otherwise, they'll be redirected to the root/login page. After login, the user lands on the Home page where they search for NBA players. The search triggers an API call to the backend (`api/v1/getPlayer/:name`) and stores the payload in the `location` state as `playerData` while navigating to the `/check-player` route. Users can then view last 'N' games or head-2-head games of players in `/check-player` route. playerData is stored in the `location` state in both the `/last-n-games` and `/head-to-head` routes. In `/last-n-games`, users fill in information about the stat they want to check, the prop-line, and the number of games they wish to view. This triggers an API call to the backend (`/api/v1/getGames/playerID?n=<>`) which uses the `playerID` from `playerData` and `n` from the number of games filled out to get the 'n' game logs of the player, and sends that payload and the other information (prop-line, stat, number of games, etc.) to the `location` state in the `/results` route. Similarly, in `/head-to-head`, users fill out the same info except they must fill out the opposing team instead of number of games. This triggers an API call to the backend (`/api/v1/getHeadToHead/:player_id/:team_name`) to get the game logs of the player against the chosen opposing team, and sends that payload and the other information to the `location` state in the `/results` route. The data is displayed as an interactive bar graph of the relevant game logs using `Chart.js`.

#### Backend  
* [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)  
* [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)  
* [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)  
* [![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)  
* [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)  
The `nba_api` was used to populate the PSQL tables with the latest active players and gamelogs using Python scripts.


  API Routes
  
  `POST /auth/registerUser` - Register a new user.

  `POST /auth/loginUser` - Login and receive a JWT.

  `GET /auth/verifyUser` - Verify JWT for protected routes.

  `GET /dashboard` - Get the logged-in user's name (protected).

  `GET /api/v1/getPlayer/:name` - Get player info by name.

  `GET /api/v1/getGames/:player_id?n=<n>` - Get last N games for a player.

  `GET /api/v1/getHeadToHead/:player_id/:team_name` - Get games vs. a specific team.

  `GET /api/v1/playerPlayedOpponentDidNot/:playerA_id/:playerB_id/:teamA/:teamB` - Find games where player A played, but played B didn't


  Middleware:
  
  `authorization.js` - Checks JWT validity for protected routes

  `validInfo.js` - Validates registration/login input

#### DevOps
* [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)  
* [![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?logo=awsamplify&logoColor=white)](https://aws.amazon.com/amplify/) - Frontend hosting  
* [![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black)](https://render.com/) - Backend hosting  
* [![Neon](https://img.shields.io/badge/Neon-1A1A1A?logo=neon&logoColor=white)](https://neon.tech/) - Database hosting 

## Getting Started:
Here's how you can get this project started up locally

### Prerequisites:
Install Docker and Docker Compose (https://www.docker.com/products/docker-desktop/)


### Installation & Set Up:
##### 1. Clone the repository

```
git clone https://github.com/khoamelo/PickEmOrKickEm.git

cd PickEmOrKickEm
```

##### 2. Create a .env file for root directory, server, and client
* For the root directory .env file, add:
```
PGUSER=postgres
PGHOST=db
PGPASSWORD=<your_password>
PGDATABASE=<your_db_name>
PGPORT=<your_pg_port>
```
* For the server directory .env file, add:
```
PORT=<your_port>
PGUSER=postgres
PGHOST=db
PGPASSWORD=<your_password>
PGDATABASE=<your_db_name>
PGPORT=<your_pg_port>
JWT_SECRET=<your_jwt_key>
```
* For the client directory .env file, add:
```
VITE_API_URL=http://localhost:<your_port>
```

##### 3. Make the following changes:
* In the *docker-compose.yml* file, add `- /app/node_modules` under `services` -> `client` -> `volumes`
* In the *Dockerfile* file for the *client* directory, change `COPY package.*json ./` to `COPY package*.json ./`

##### 4. Start all services by running:
```
docker-compose up --build
```

##### 5. Populate the DB by running the following (WARNING: this will take a few minutes to complete):
```
docker-compose exec server python3 /app/db/nba_api_to_db/add_active_players_db.py
docker-compose exec server python3 /app/db/nba_api_to_db/add_game_logs_db.py
```

##### 6. (Optional) To repopulate the DB with the latest, updated data, run the following:
```
docker-compose down -v
docker-compose up --build
```
Then repeat step 5

## Usage:
Once you have installed and set up everything, you will be prompted to sign in or register. If you don't have an account which you probably don't if you just installed and set up for the first time, or repopulated the DB, then register, then sign in
![login_page_ss](https://github.com/user-attachments/assets/47580a90-881e-4ae7-9481-1e012a54aafc)

Once signed in, you will be prompted to enter an active NBA player name to check stats for (The matching is case-insensitive and accent-insensitive, but sensitive to punctuation such as periods and hyphens (e.g., P.J. Tucker, Shai Gilegous-Alexander, etc.))
![home_page_ss](https://github.com/user-attachments/assets/4f017379-00f8-4524-8f9a-d39c087f22dc)

After choosing a player, you will prompted to choose to check either of the following "Last 'N' Games" or "Head-2-Head Games." Last 'N' Games will visualize the game logs of the players last 'n' games, and Head-2-Head games will visualize the game logs of players playing against a specific team
![check_player_ss](https://github.com/user-attachments/assets/c34b04c2-b1b1-462b-8aa8-82a9e3e91d2c)

If Last 'N' Games is chosen, you will be asked to choose a stat to check (points, rebounds, assists, points + rebounds, etc.), a prop-line that a betting site might have (SGA over *31.5* points), and the number of games you want to view
![last_n_games_ss](https://github.com/user-attachments/assets/9904b458-8840-4710-8513-5f3d8783f3ee)

Similarly, if Head-2-Head Games is chosen, you will asked to choose a stat to check, a prop-line, and the opposing team
![h2h_games_ss](https://github.com/user-attachments/assets/3a686db5-7594-4f6a-960d-0d2829396503)

Once you enter in all the required fields, you will be shown a bar graph of the games you chose to visualize for the player, and whether the player hit over their prop-line (green), hit under (red), or hit exactly on the prop-line (gray). Three gauges are on top of the bar graph which gives a percentage of the player hitting over, under, or pushing the prop-line. Hovering over each bar will give you the date of the match played, the opponent and whether or not they played home or away, and the exact stat the player got.

*Last N Games*
![last_n_games_ss_results](https://github.com/user-attachments/assets/a2e89554-5cc1-4f01-89ea-d7ca40215465)

*H2H Games*
![h2h_games_results](https://github.com/user-attachments/assets/6fcba730-f02c-4a0e-9706-f00259c4829a)

You can also adjust the minutes played to filter out games where players played a certain amount of minutes
![last_ngames_ss_results_v2](https://github.com/user-attachments/assets/00a8a339-c92e-42a8-9f1d-77db30d31c08)



