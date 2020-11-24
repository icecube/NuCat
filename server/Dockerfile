# Dockerfile for React client
# Build react client
FROM node:12

# Working directory be app
WORKDIR /usr/src/app
COPY package*.json ./

###  Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

# Back end on 3000
EXPOSE 3000

CMD ["npm","start"]