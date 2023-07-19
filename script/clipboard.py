
from typer import Typer
import requests

from config import settings

headers = {
    "Authorization": "Bearer " + settings.API_AUTH_TOKEN
}

app = Typer()

@app.command()
def pull():
  res = requests.get(settings.API_BASE_URL + "/api/clipboard/get", headers=headers)

  if res.status_code == 200:
    print(res.text)
  else:
    print("Error: " + res.text)


@app.command()
def push(text: str):
  res = requests.post(settings.API_BASE_URL + "/api/clipboard/set", headers=headers, json={"text": text})

  if res.status_code == 200:
    print("Success")
  else:
    print("Error: " + res.text)


@app.command()
def clear():
  res = requests.post(settings.API_BASE_URL + "/api/clipboard/clear", headers=headers)

  if res.status_code == 200:
    print("Success")
  else:
    print("Error: " + res.text)

if __name__ == "__main__":
  app()