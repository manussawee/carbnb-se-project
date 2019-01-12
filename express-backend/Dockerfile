FROM node:10.15.0
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "production"]
