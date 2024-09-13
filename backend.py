from fastapi import FastAPI,HTTPException,File, Form, UploadFile
from pydantic import BaseModel   
import pymongo
from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import Optional
import os
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
mongo_uri = "mongodb+srv://aman17272706:lTIDEDz77aGKynCy@credentials.baws4.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(mongo_uri) 
db = client["Product_database"] 
product_collection = db["product"] 
cart_collection = db["cart"] 

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
]

# Add CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    product_name: str
    product_description: str
    product_price: float
    stock_quantity: int
    product_image: Optional[str] 

class CartItem(BaseModel):
    product_id: str
    quantity: int

    

@app.get('/products_find/{product_id}')
async def get_product(product_id: str):
    try:
        
        product_obj_id = ObjectId(product_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    try:
        
        item = product_collection.find_one({"name": "Lettuce"})
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
    
    if item is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "quantity": item["quantity"],
        "price": item["price"],
        "description": item["description"],
        "vendor_details": item["vendor_details"],
        "category": item["category"],
        "rating": item["rating"]
    }
    

@app.post('/cart')
async def add_to_cart(item : CartItem):
    
    cart = cart_collection.find_one({"product_id" : item.product_id})
    
    if cart :
        cart_collection.update_one(
            {"product_id" : item.product_id},
            {"$inc" : {"quantity" : item.quantity}}
        )
    
    else :
        cart_collection.insert_one({
            "product_id" : item.product_id,
            "quantity" : item.quantity
        })
    return {"message" : "Product added to the cart successfully"}


@app.put("/cart/{product_id}")
async def update_cart_item(product_id: str):
    # Decrement the quantity by 1
    result = cart_collection.update_one(
        {"product_id": product_id},
        {"$inc": {"quantity": -1}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found in the cart")
    
    
    updated_item = cart_collection.find_one({"product_id": product_id})
    
    
    if updated_item and updated_item["quantity"] <= 0:
        cart_collection.delete_one({"product_id": product_id})
        return {"message": "Cart item removed as quantity reached 0"}
    
    return {"message": "Cart item quantity decremented successfully!"}


@app.get("/cart")
async def get_cart_items():
    cart_items = []
    total_price = 0
    
    for item in cart_collection.find():
        product = product_collection.find_one({"_id": ObjectId(item["product_id"])})
        if product:
            item_total_price = product["price"] * item["quantity"]
            cart_items.append({
                "product_id": str(product["_id"]),
                "name": product["name"],
                "quantity": item["quantity"],
                "price": item_total_price
            })
            total_price += item_total_price
    
    return {"cart_items": cart_items, "total_price": total_price}
