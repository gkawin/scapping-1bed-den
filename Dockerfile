FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Start the app
CMD [ "node", "index.js" ]