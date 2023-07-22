FROM python:3.9-slim-buster

WORKDIR /app
COPY ./Pipfile* ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

COPY ./back ./

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:4040", "login:app"]
