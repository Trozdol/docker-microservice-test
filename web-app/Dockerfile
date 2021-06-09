FROM nginx:alpine

COPY ./default.conf /etc/nginx/sites-enabled/default

COPY ./ /var/www

EXPOSE 80 443

CMD ["nginx"]