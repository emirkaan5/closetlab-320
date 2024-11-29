# MongoDB Documentation

## Collections
Collection list:
* calendars
    * `_id: ObjectID`
    * `user_id: ObjectID`
    * `days: ObjectID[]`
* clothing_items
    * `_id: ObjectID`
    * `name: String`
    * `image_link: String`
    * `image: Binary` (images are stored in base64)
    * `color_tags: ObjectID[]`
    * `type_tags: ObjectID[]`
    * `brand_tags: ObjectID[]`
    * `other_tags: ObjectID[]`
    * `donation_reminders: Boolean`
    * `user_id: Object_ID`
    * `date_added: Date`
    * `last_worn: Date`
* days
    * `_id: ObjectID`
    * `calendar_id: ObjectID`
    * `outfits: ObjectID[]`
    * `date: Date`
* outfits
    * `_id: ObjectID`
    * `name: String`
    * `items: ObjectID[]`
* users
    * `_id: ObjectID`
    * `username: String`
    * `password: String`
    * `calendar: ObjectID`

## Connection Details
username: kmalsky

password: Cw1ccE8Bq5VV8Lwe

connection link: mongodb+srv://kmalsky:Cw1ccE8Bq5VV8Lwe@closetlab.q7yvq.mongodb.net/

To connect in mongosh, connect using the connection link and `use closet_lab_db`.