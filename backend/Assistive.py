from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Optional

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",  # Your React frontend's URL
    # Add any other frontend URLs here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# MongoDB connection details (using AsyncIOMotorClient)
mongo_uri = "mongodb+srv://aman17272706:lTIDEDz77aGKynCy@credentials.baws4.mongodb.net/?retryWrites=true&w=majority"
client = AsyncIOMotorClient(mongo_uri)
db = client["Blog_DB"]
users_collection = db["Blog_Data"]

# Blog Pydantic model
class Blog(BaseModel):
    title: str
    description: str
    category: str
    thumbnail: Optional[str] = None

# Convert MongoDB ObjectId to string
def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "description": blog["description"],
        "category": blog["category"],
    }

@app.get("/blogs/", response_model=List[Blog])
async def get_all_blogs():
    blogs = []
    async for blog in users_collection.find():  # Using async find
        blogs.append(blog_helper(blog))
    return blogs

@app.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    blog = await users_collection.find_one({"_id": ObjectId(blog_id)})  # Using async find_one
    if blog:
        return blog_helper(blog)
    else:
        raise HTTPException(status_code=404, detail="Blog not found")