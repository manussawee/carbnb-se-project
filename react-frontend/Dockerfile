FROM node:10.15.0
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm -g install serve
EXPOSE 5000
CMD ["serve", "-s", "build"]
