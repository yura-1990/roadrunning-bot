FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
#RUN  npm install
#RUN npm install -g pm2 

COPY . .

EXPOSE 3000
#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "start"] 
#CMD ["pm2-runtime", "start", "npm", "--name", "bot", "--", "start"]
