from node:14

#Working direction for GraphQL-gateway
WORKDIR /usr/src/app


# Is better copy package.json and run npm install
# before to copy application's code 
# Read here :https://medium.com/condenastengineering/speedy-builds-with-docker-layer-caching-7ed590ac2fd1 
COPY package.json ./

RUN npm install
COPY . .

RUN npm run build
EXPOSE 5003

CMD ["node" , "dist/server.js"]