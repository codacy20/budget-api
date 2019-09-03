FROM node:carbon-alpine as dist
WORKDIR /tmp/
ENV .env /
COPY package*.json tsconfig.json tsconfig.build.json ./ 
COPY src/ src/
RUN npm install
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]