/* Developers
* Shaked Weis 326403128
* Nikita Chuiko 317661882
* */

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://Shaked:shaked123@serversidecoursecluster.1hljluk.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true });
const db = client.db("Main");
create_users_collection = (client) => client.connect(err => {
    db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "first_name", "last_name", "birthday"],
                properties: {
                    user_id: {
                        bsonType: "int",
                        description: "must be a int and is required"
                    },
                    first_name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    last_name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    birthday: {
                        bsonType: "date",
                        description: "must be a date and is required"
                    }
                }
            }
        },
        validationAction: "error"
    }, (err, result) => {
        console.log("users collection created");
        db.collection("users").createIndex({id: 1}, (err, result) =>
            console.log("index on 'id' property created"));
        client.close();
    });
});
const user = {user_id: 123123, first_name: "moshe", last_name: "israeli", birthday: new Date("January, 10th, 1990")};
insert_imaginary_user = (user, callback) => {
    db.collection("users").insertOne(user, function(err, res) {
        if (err) return callback(err);
        console.log("1 user inserted successfuly to the database");
        client.close();
        return callback(null, res);
    });
};
create_users_collection(client);
insert_imaginary_user(user, function(err, res) {
    if (err) console.log(err);
    else console.log(res);
});
create_costs_collection = (client) => client.connect(err => {
    db.createCollection("costs", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "year", "month", "day", "description", "category", "sum"],
                properties: {
                    user_id: {
                        bsonType: "number",

                    },
                    year: {
                        bsonType: "number",

                    },
                    month: {
                        bsonType: "string",

                    },
                    day: {
                        bsonType: "number",

                    },
                    description: {
                        bsonType: "string",

                    },
                    category: {
                        bsonType: "string",

                    },
                    sum: {
                        bsonType: "number",

                    }
                }
            }
        },
        validationLevel: "strict",
        validationAction: "error"
    }, (err, result) => {
        console.log("costs collection created");
        db.collection("costs").createIndex({user_id: 1, year: 1, month: 1, day: 1}, (err, result) =>
            console.log("index on 'user_id','year','month','day' property created"));
        client.close();
    });
});
create_costs_collection(client);
