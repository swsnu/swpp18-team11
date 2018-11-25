FROM nginx

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y curl gnupg && curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install --global yarn && npm upgrade --global yarn 
COPY . .
RUN yarn && yarn build --prod

RUN mkdir -p /usr/share/nginx/html
RUN cp -r dist/* /usr/share/nginx/html/

COPY deployment/nginx.conf /etc/nginx/nginx.conf

CMD nginx
