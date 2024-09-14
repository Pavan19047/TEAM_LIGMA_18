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


# Pydantic model for catalogue items
class Catalogue(BaseModel):
    Image_Url: str
    name: str
    Offer: str
    price: int

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

@app.get("/api/sensor-data")
async def get_sensor_data():
    try:
        # Retrieve the latest data from MongoDB
        cursor = collection.find().sort("timestamp", -1).limit(100)  # Limit to the latest 100 records
        data = await cursor.to_list(length=100)

        # Convert MongoDB documents to a list of dictionaries
        result = [
            {
                "date": d["timestamp"].strftime("%Y/%m/%d"),
                "time": d["timestamp"].strftime("%H:%M:%S"),
                "temperature": d["temperature"],
                "humidity": d["humidity"],
                "ldr": d["ldr"],
                "soilMoisture": d["soil_moisture"]
            }
            for d in data
        ]
        return result
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving data")


@app.get("/api/sensor-data")
async def get_sensor_data():
    try:
        # Retrieve the latest data from MongoDB
        cursor = collection.find().sort("timestamp", -1).limit(100)  # Limit to the latest 100 records
        data = await cursor.to_list(length=100)

        # Convert MongoDB documents to a list of dictionaries
        result = [
            {
                "date": d["timestamp"].strftime("%Y/%m/%d"),
                "time": d["timestamp"].strftime("%H:%M:%S"),
                "temperature": d["temperature"],
                "humidity": d["humidity"],
                "ldr": d["ldr"],
                "soilMoisture": d["soil_moisture"]
            }
            for d in data
        ]
        return result
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving data")
 
    
@app.get('/catalogue', response_model=List[Catalogue])
async def get_catalogue():
    try:
        # Fetch all products from the MongoDB collection
        items = product_collection.find().limit(4)
        product_list = []

        # Iterate through the MongoDB documents and format them
        for item in items:
            product = Catalogue(
                Image_Url=item.get("Image_Url", ""),
                name=item.get("name", ""),
                Offer=item.get("Offer", ""),  # Fixed from "Offers" to "Offer" if that was a typo
                price=item.get("price", 0)
            )
            product_list.append(product)

        return product_list

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch products from the database.")
    

