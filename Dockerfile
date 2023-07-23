FROM python:3.9-slim-buster

WORKDIR /app

COPY ./requirements.txt ./requirements.txt
RUN python3 -m pip install -r requirements.txt

RUN apt-get update
RUN apt-get install -y nginx

COPY ./script/nginx.dev-w-auth.conf /etc/nginx/nginx.conf

CMD ["nginx"]