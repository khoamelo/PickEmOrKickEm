# Pick 'Em or Kick 'Em  
*Analyze NBA player stats and performance trends to make smarter sports betting picks!*

## Built With:
#### Frontend  
* [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)  
* [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)  
* [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)  
* [![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)  
* [![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)  

#### Backend  
* [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)  
* [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)  
* [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)  
* [![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)  
* [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)  

#### DevOps
* [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)  
* [![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?logo=awsamplify&logoColor=white)](https://aws.amazon.com/amplify/) - Frontend hosting  
* [![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black)](https://render.com/) - Backend hosting  
* [![Neon](https://img.shields.io/badge/Neon-1A1A1A?logo=neon&logoColor=white)](https://neon.tech/) - Database hosting 

## Getting Started:
Here's how you can get this project started up locally

### Prerequisites:
Docker and Docker Compose


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
Once you have installed and set up everything, 
