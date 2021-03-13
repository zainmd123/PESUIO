from fastapi import FastAPI
import uvicorn
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
   
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class Item(BaseModel):
    name : str
    quantity : float

class ItemID(BaseModel):
    item_id : int

class Update(BaseModel):
    item_id: int
    name: str
    quantity: float

grocery_lst = []    

@app.get("/")#gets main page
def display():
    return "Welcome to your Grocery List"

@app.get("/grocerylist")#returns grocery list
def get_list():
    res = {'grol':grocery_lst}
    return  res

@app.post("/newitem")
def add_item(item: Item):
    item_encoded = jsonable_encoder(item)
    grocery_lst.append(item_encoded)
    return item

@app.delete("/removeitem/{item_id}")
def delete_item(item_var: ItemID ):
    return grocery_lst.pop(item_var.item_id-1)

@app.put("/edititem/{item_id}")   
def update_item(newitem: Update):
    grocery_lst[newitem.item_id-1] = {"name":newitem.name, "quantity":newitem.quantity}
    return grocery_lst[newitem.item_id-1]


    

