# Choose the Node.js version
FROM node:20

# Set the working direction
WORKDIR /usr/src/app

# Copy the file package*json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install -D

# Next, we copy the prisma/ folder which contains our Prisma schema
COPY prisma ./prisma/

# After dependencies are installed, copy the rest of the project
COPY . .

# Expose the port
EXPOSE 3000

RUN npx prisma migrate deploy
RUN npx prisma generate

# Start the application
CMD [ "npm", "run", "app"]
