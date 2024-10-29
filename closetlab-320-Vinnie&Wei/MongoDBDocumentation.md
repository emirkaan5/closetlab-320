# MongoDB Documentation

## Databases
Database list:
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