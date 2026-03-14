#Dockerfile for Nginx gateway to serve traffic 

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

