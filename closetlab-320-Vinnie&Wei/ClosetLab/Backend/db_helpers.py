from pymongo import MongoClient
from bson.objectid import ObjectId

# Initialize the database connection
client = MongoClient("mongodb+srv://kmalsky:Cw1ccE8Bq5VV8Lwe@closetlab.q7yvq.mongodb.net/?retryWrites=true&w=majority&appName=ClosetLab")  
closet_lab_database = client["closet_lab_db"]

dummy_user_id = "67057228f80354e361ae2bf5"

def db_add_clothing_item(name: str = "", image_link: str = "", image: str = "", user_id: str = dummy_user_id,
                         brand_tags: list = None, color_tags: list = None,
                         other_tags: list = None, type_tags: list = None,
                         donation_reminders: bool = False):
    try:
        print("Adding clothing item to database")
        clothing_item_collection = closet_lab_database["clothing_items"]
        clothing_item = {
            "name": name,
            "image_link": image_link,
            "image": image,  
            "user_id": ObjectId(user_id),
            "brand_tags": brand_tags or [],
            "color_tags": color_tags or [],
            "other_tags": other_tags or [],
            "type_tags": type_tags or [],
            "donation_reminders": donation_reminders
        }
        result = clothing_item_collection.insert_one(clothing_item)
        print("Clothing item added successfully with ID:", result.inserted_id)
        return str(result.inserted_id)
    except Exception as e:
        print("Error adding item to database:", str(e))
        raise

def db_get_clothing_item(object_id: str):
    try: 
        print("Getting clothing item from database")
        clothing_item_collection = closet_lab_database["clothing_items"]
        document = clothing_item_collection.find_one({"_id": ObjectId(object_id)})
        if document:
            # Convert ObjectId to string for JSON serialization
            document['_id'] = str(document['_id'])
            document['user_id'] = str(document.get('user_id', ''))
            document['brand_tags'] = document.get('brand_tags', [])
            document['color_tags'] = document.get('color_tags', [])
            document['other_tags'] = document.get('other_tags', [])
            document['type_tags'] = document.get('type_tags', [])
        return document
    except Exception as e:
        print("Error getting clothing item from database:", str(e))
        raise

def db_delete_clothing_item(object_id: str):
    try:
        print("Deleting clothing item from database")
        clothing_item_collection = closet_lab_database["clothing_items"]
        result = clothing_item_collection.delete_one({"_id": ObjectId(object_id)})
        if result.deleted_count == 0:
            print("No clothing item found with that ID.")
            return False
        print("Clothing item deleted successfully.")
        return True
    except Exception as e:
        print("Error removing item from database:", str(e))
        raise

def db_get_outfit(object_id: str):
    try:
        print("Getting outfit from database")
        outfit_collection = closet_lab_database["outfits"]
        document = outfit_collection.find_one({"_id": ObjectId(object_id)})
        if document:
            document['_id'] = str(document['_id'])
            document['user_id'] = str(document.get('user_id', ''))
            document['items'] = [str(item) for item in document.get('items', [])]
        return document
    except Exception as e:
        print("Error getting outfit from database:", str(e))
        raise

def db_add_outfit(user_id: str = dummy_user_id, name: str = "Unnamed Outfit", items: list = None):
    try:
        print("Adding outfit to database")
        outfit_collection = closet_lab_database["outfits"]
        item_ids = [ObjectId(item) for item in (items or [])]
        outfit = {
            "user_id": ObjectId(user_id),
            "name": name,
            "items": item_ids
        }
        result = outfit_collection.insert_one(outfit)
        print("Outfit added successfully with ID:", result.inserted_id)
        return str(result.inserted_id)
    except Exception as e:
        print("Error adding outfit to database:", str(e))
        raise

def db_delete_outfit(object_id: str):
    try:
        print("Deleting outfit from database")
        outfit_collection = closet_lab_database["outfits"]
        result = outfit_collection.delete_one({"_id": ObjectId(object_id)})
        if result.deleted_count == 0:
            print("No outfit found with that ID.")
            return False
        print("Outfit deleted successfully.")
        return True
    except Exception as e:
        print("Error deleting outfit from database:", str(e))
        raise
