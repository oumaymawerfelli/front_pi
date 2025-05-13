FROM node:20.5-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@16.2.16

COPY package*.json ./
RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/last /usr/share/nginx/html

EXPOSE 80

RUN find /usr/share/nginx/html -type f -name '*.js' -exec grep -l 'DOCKER_APIURL_PLACEHOLDER' {} \; || echo "Placeholder not found in any JS files"

CMD ["/bin/sh", "-c", \
"echo 'Replacing DOCKER_APIURL_PLACEHOLDER with: $DOCKER_APIURL' && \
find /usr/share/nginx/html -type f \\( -name '.js' -o -name '.js.map' \\) -exec sed -i 's|DOCKER_APIURL_PLACEHOLDER|'\"$DOCKER_APIURL\"'|g' {} + && \
nginx -g 'daemon off;'"]