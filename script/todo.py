
from typer import Typer, Argument
import requests
import json
from typing import Optional

from config import settings

headers = {
    "Authorization": "Bearer " + settings.API_AUTH_TOKEN
}

app = Typer()

@app.command()
def list():
  res = requests.get(settings.API_BASE_URL + "/api/todo/get",
                     headers=headers)

  if not res.ok:
    print(f"Error: {res}")
    return
  
  tlist = res.json()

  for k,v in tlist.items():
    print(f"{'[x]' if v['completed'] else '[ ]'}  {k}: {v['title']}")
    print(f"\t{v['desc']}")




@app.command()
def get(id: int):
  res = requests.get(settings.API_BASE_URL + f"/api/todo/get/{id}",
                     headers=headers)
  if not res.ok:
    print(f"Error: {res}")
    return
  titem = res.json()
  print(f"{'[x]' if titem['completed'] else '[ ]'}  {id}: {titem['title']}")
  print(f"\t{titem['desc']}")




@app.command()
def add(title: str, desc: str):
  res = requests.post(settings.API_BASE_URL + "/api/todo/add",
                      headers=headers, json={"title":title,"desc": desc})
  if not res.ok:
    print(f"Error: {res.text}")
    return
  id = res.json()["id"]
  get(id)




@app.command()
def delete(id: int):
  res = requests.post(settings.API_BASE_URL + f"/api/todo/delete/{id}",
                      headers=headers)
  if not res.ok:
    print(f"Error: {res.text}")
    return
  print(f"Item {id} deleted.")



@app.command()
def update(id: int, title: Optional[str] = None,
                    desc: Optional[str] = None, 
                    completed: Optional[bool] = None):
  
  data = {}
  if title is not None: data["title"] = title
  if desc is not None: data["desc"] = desc
  if completed is not None: data["completed"] = completed

  res = requests.post(settings.API_BASE_URL + f"/api/todo/update/{id}",
                      headers=headers, json=data)
  if not res.ok:
    print(f"Error: {res.text}")
    return
  get(id)



@app.command()
def clear():
  res = requests.post(settings.API_BASE_URL + "/api/todo/clear",
                      headers=headers)
  if not res.ok:
    print(f"Error: {res.text}")
    return
  print("List cleared.")



@app.command()
def complete(id: int):
  res = requests.post(settings.API_BASE_URL + f"/api/todo/complete/{id}",
                      headers=headers)
  if not res.ok:
    print(f"Error: {res.text}")
    return
  get(id)


if __name__ == "__main__":
  app()