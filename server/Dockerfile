FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Python and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# Create and activate a virtual environment, then install Python packages
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --upgrade pip && pip install nba_api psycopg2-binary python-dotenv

COPY . .

ENV PORT=4005
EXPOSE 4005

CMD ["npm", "start"]