#!/bin/bash

cd /app

nginx

gunicorn --bind 0.0.0.0:5000 tristram:app &
gunicorn --bind 0.0.0.0:5001 login:app
