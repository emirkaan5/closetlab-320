from flask import Flask, jsonify, request
from flask_cors import CORS

from db_helpers import (
    dummy_user_id,
    client,
    db_get_clothing_item,
    db_add_clothing_item,
    db_delete_clothing_item,
    db_get_outfit,
    db_add_outfit,
    db_delete_outfit
)

app = Flask(__name__)
CORS(app)  # Allow all origins for testing

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("MongoDB Connection Failed")
    print(e)

print(client.list_database_names())
closet_lab_database = client["closet_lab_db"]
print("For reference, the names of the collections in the database are: " + str(closet_lab_database.list_collection_names()))

app = Flask(__name__)
CORS(app)  # Allow all origins for testing

@app.route('/api/test/', methods=['GET'])
def api_test():
    try:
        print("got request from frontend")
        return jsonify({"message": "hello from the other siiiide"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# POST route to add a new clothing item
@app.route('/api/v1/clothing-items', methods=['POST'])
def add_clothing_item():
    print("added one potentially")
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        image = data.get('image_link')
        if not image:
            return jsonify({'error': 'Image data is required'}), 400

        name = data.get('name', '')
        image_link = data.get('image_link', '') 
        user_id = data.get('user_id', dummy_user_id)
        brand_tags = data.get('brand_tags', [])
        color_tags = data.get('color_tags', [])
        other_tags = data.get('other_tags', [])
        type_tags = data.get('type_tags', [])
        donation_reminders = data.get('donation_reminders', False)

        item_id = db_add_clothing_item(
            name=name,
            image_link=image_link,
            image=image,
            user_id=user_id,
            brand_tags=brand_tags,
            color_tags=color_tags,
            other_tags=other_tags,
            type_tags=type_tags,
            donation_reminders=donation_reminders
        )

        return jsonify({'message': 'Clothing item added successfully', 'id': item_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# GET route to retrieve a clothing item by ID
@app.route('/api/v1/clothing-items/<string:item_id>', methods=['GET'])
def get_clothing_item(item_id):
    try:
        clothing_item = db_get_clothing_item(item_id)
        if clothing_item:
            return jsonify(clothing_item), 200
        else:
            return jsonify({'error': 'Clothing item not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# GET route to retrieve all clothing items belonging to user, by user ID
@app.route('/api/v1/clothing-items-get-all/<string:user_id>', methods=['GET'])
def get_all_clothing_items(user_id):
    #print("hello")
    try:
        #print("hello2")
        item_collection = closet_lab_database["clothing_items"].find()
        returnItems = []
        for item in item_collection.to_list():
            #print("hello3")
            if (str(user_id) == str(item["user_id"])):
            #    try:
            #       print(item["name"])
                returnItems.append(db_get_clothing_item(item["_id"]))  
            #    except Exception as e:
            #        return jsonify({'error': 'Clothing item not found'}), 404
        #print("hello4")
        #print(returnItems)
        return jsonify(returnItems), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE route to delete a clothing item by ID
@app.route('/api/v1/clothing-items/<string:item_id>', methods=['DELETE'])
def delete_clothing_item(item_id):
    try:
        success = db_delete_clothing_item(item_id)
        if success:
            return jsonify({'message': 'Clothing item deleted successfully'}), 200
        else:
            return jsonify({'error': 'Clothing item not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# POST route to add a new outfit
@app.route('/api/v1/outfits', methods=['POST'])
def add_outfit():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        name = data.get('name', 'Unnamed Outfit')
        user_id = data.get('user_id', dummy_user_id)
        items = data.get('items', [])

        outfit_id = db_add_outfit(
            user_id=user_id,
            name=name,
            items=items
        )

        return jsonify({'message': 'Outfit added successfully', 'id': outfit_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# GET route to retrieve an outfit by ID
@app.route('/api/v1/outfits/<string:outfit_id>', methods=['GET'])
def get_outfit(outfit_id):
    try:
        outfit = db_get_outfit(outfit_id)
        if outfit:
            return jsonify(outfit), 200
        else:
            return jsonify({'error': 'Outfit not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE route to delete an outfit by ID
@app.route('/api/v1/outfits/<string:outfit_id>', methods=['DELETE'])
def delete_outfit(outfit_id):
    try:
        success = db_delete_outfit(outfit_id)
        if success:
            return jsonify({'message': 'Outfit deleted successfully'}), 200
        else:
            return jsonify({'error': 'Outfit not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/scrap', methods=['GET'])
def scrap(): #so that this database doesn't get impossibly messy while I'm testing
    try:
        db = client['closetlab']
        clothing_item_collection = db['clothing_items']
        try:
            print("Deleting all clothing items from database")
            for item in clothing_item_collection.find():
                print(clothing_item_collection.delete_one({"_id": item["_id"]}))
        except Exception as e:
            print("Error removing item from database, " + e)

        # Return success message
        return jsonify({'message': 'Destroyed database data'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
