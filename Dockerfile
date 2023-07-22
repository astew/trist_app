FROM python:3.9-slim-buster

WORKDIR /app
COPY ./back ./
COPY ./Pipfile* ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "tristram:app"]
