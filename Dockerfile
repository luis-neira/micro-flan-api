FROM node:20-alpine3.21

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY --chown=app:node package*.json ./
RUN npm install
COPY --chown=app:node . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]
