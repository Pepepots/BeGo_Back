FROM node:18.15-alpine
WORKDIR /app
COPY [ \
  "./package.json", \
  "./package-lock.json", \
  "/app/" \
]
RUN npm install --no-cache
COPY [ \
  "./nodemon.json", \
  "./tsconfig.json", \
  "/app/" \
]
ADD ["./src", "/app/src/"]
EXPOSE 5000
CMD ["npm", "run", "start"]