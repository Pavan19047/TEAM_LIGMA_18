import base64
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import pymongo

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
]

mongo_uri = "mongodb+srv://aman17272706:lTIDEDz77aGKynCy@credentials.baws4.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(mongo_uri) 
db = client["Product_database"] 
product_collection = db["product"] 
cart_collection = db["cart"]


# Add CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to save uploaded images
IMAGE_DIR = "images"
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

# Define the Pydantic model to match the incoming JSON data
class Product(BaseModel):
    productName: str
    productDescription: str
    productPrice: float
    stockQuantity: int
    productImage: Optional[str] = None  # Base64 image string can be None

# Utility function to save the base64 image to the server
def save_base64_image(base64_str, filename):
    try:
        # Decode base64 string
        image_data = base64.b64decode(base64_str.split(",")[1])
        # Write the image data to a file
        with open(os.path.join(IMAGE_DIR, filename), "wb") as file:
            file.write(image_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")

# POST route to handle product creation
@app.post("/api/products")
async def create_product(product: Product):
    # Log the received product data
    print("Received product data:", product.dict())
    product_name = product.productName
    product_description = product.productDescription
    product_price = product.productPrice
    stock_quantity = product.stockQuantity
    product_image = product.productImage
    
    print(product_name)
    print(product_description)
    print(product_price)
    print(stock_quantity)
    # print(product_image)
    
    # Save the image if provided
    if product.productImage:
        image_filename = f"{product.productName.replace(' ', '_').lower()}.png"
        try:
            save_base64_image(product.productImage, image_filename)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    # Here you can add logic to save product data to a database, etc.
    # For now, we are just simulating the creation
    return {"message": "Product created successfully", "product": product.dict()}
