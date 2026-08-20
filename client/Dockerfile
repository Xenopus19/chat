
FROM node:24-alpine AS build-stage

WORKDIR /usr/src/app

COPY client/package*.json ./client/
WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app
COPY client ./client
COPY src ./src
COPY tsconfig.json ./

ARG VITE_API_BASE_URL
ARG VITE_BUCKET_URL
ARG VITE_SOCKET_URL

WORKDIR /usr/src/app/client
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_BUCKET_URL=$VITE_BUCKET_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    npx vite build


FROM nginx:1.29-alpine

RUN rm -rf /usr/share/nginx/html/*

RUN echo $'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/src/app/client/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]