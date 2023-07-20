# First, build the front end
FROM node:20 as builder
WORKDIR /usr/app
COPY ./front /usr/app
RUN npm ci
RUN npm run build

# Then make the back end
FROM python:3.9-slim-buster

WORKDIR /app
COPY ./back .
COPY --from=builder /usr/app/build /app/front
COPY ./Pipfile* .
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

ARG PORT=5000

EXPOSE $PORT
ENV FLASK_APP=tristram
ENV FLASK_RUN_PORT=$PORT
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["flask", "run"]
