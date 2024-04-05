FROM nginx:alpine

ENV LANG="C.UTF-8"

WORKDIR /var/www

RUN sed -i 's/\/usr\/share\/nginx\/html;/\/var\/www;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/root   \/var\/www;/root   \/var\/www;\n\ttry_files $uri \/index.html =404;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/#gzip  on;/gzip  on;\n    server_tokens off;\n    client_max_body_size 10M;/g' /etc/nginx/nginx.conf


COPY ./build /var/www
